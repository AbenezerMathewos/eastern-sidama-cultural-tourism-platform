const mongoose = require('mongoose');
const WithdrawalRequest = require('../models/withdrawalRequestModel');
const {
  getOrCreateWalletForHost,
  moveAvailableToPending
} = require('./walletService');
const AppError = require('../utils/appError');

const MIN_WITHDRAWAL_CENTS = 1000; // ETB 10.00

async function validateHostCanWithdraw(user, amountCents) {
  if (!user) throw new AppError('Unauthorized', 401);
  if (user.role !== 'admin' && user.hostStatus !== 'approved') {
    throw new AppError('Only approved hosts can withdraw', 403);
  }
  if (amountCents < MIN_WITHDRAWAL_CENTS) {
    throw new AppError(
      `Minimum withdrawal is ETB ${(MIN_WITHDRAWAL_CENTS / 100).toFixed(2)}`,
      400
    );
  }
}

async function createWithdrawal({
  user,
  amountCents,
  clientRequestId
}) {
  const numericAmountCents = Number(amountCents);
  await validateHostCanWithdraw(user, numericAmountCents);

  if (clientRequestId) {
    const existingWithdrawal = await WithdrawalRequest.findOne({
      host: user._id,
      clientRequestId
    });

    if (existingWithdrawal) {
      const wallet = await getOrCreateWalletForHost(user._id);
      return { withdrawal: existingWithdrawal, wallet };
    }
  }

  const accountNumber = user.cbeAccountNumber
    ? String(user.cbeAccountNumber)
    : '';
  const normalizedDestination = {
    bankName: 'CBE',
    accountName: user.cbeAccountName || 'Unknown',
    accountNumberLast4: accountNumber.slice(-4).padStart(4, '0')
  };

  // 1. Atomically reserve the funds in the wallet.
  let wallet;
  try {
    wallet = await moveAvailableToPending(user._id, numericAmountCents, {
      refType: 'WithdrawalRequest',
      refId: clientRequestId || 'auto'
    });
  } catch (err) {
    if (err.message === 'INSUFFICIENT_FUNDS') {
      throw new AppError('You do not have enough available balance.', 400);
    }
    throw err;
  }

  // 2. Upsert the request so repeated clientRequestId submissions do not hit
  // the unique { host, clientRequestId } index.
  const query = clientRequestId
    ? { host: user._id, clientRequestId }
    : { _id: new mongoose.Types.ObjectId() };

  const doc = await WithdrawalRequest.findOneAndUpdate(
    query,
    {
      $setOnInsert: {
        host: user._id,
        clientRequestId,
        amountCents: numericAmountCents,
        currency: 'ETB',
        status: 'pending_transfer',
        destination: normalizedDestination
      }
    },
    {
      upsert: true,
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true
    }
  );

  return { withdrawal: doc, wallet };
}

module.exports = {
  createWithdrawal,
  MIN_WITHDRAWAL_CENTS
};
