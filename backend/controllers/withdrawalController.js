const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const WithdrawalRequest = require('../models/withdrawalRequestModel');
const { createWithdrawal } = require('../services/withdrawalService');
const { notifyWithdrawalCreated } = require('../services/notificationService');

/**
 * @desc    Create a new withdrawal request for a host
 * @route   POST /api/v1/withdrawals
 * @access  Private (Host only)
 */
exports.create = catchAsync(async (req, res, next) => {
  const { amountCents, clientRequestId } = req.body || {};
  const numericAmountCents = Number(amountCents);

  // 1) Validation
  if (!Number.isFinite(numericAmountCents)) {
    return next(new AppError('amountCents (number) is required', 400));
  }

  // 2) Execute Service logic
  // This handles balance checks and fund reservation
  const result = await createWithdrawal({
    user: req.user,
    amountCents: numericAmountCents,
    clientRequestId
  });

  // 3) Audit logging
  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify({
      evt: 'withdrawal_created',
      userId: req.user._id,
      withdrawalId: result.withdrawal._id,
      amountCents: numericAmountCents,
      at: req.requestTime
    })
  );

  // 4) Notifications
  // Wrapped in a try/catch so a notification failure doesn't roll back the whole request
  try {
    await notifyWithdrawalCreated(req.user, result.withdrawal);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(
      'Notification failed but withdrawal was successful:',
      err.message
    );
  }

  // 5) Send Response
  res.status(201).json({
    status: 'success',
    data: {
      withdrawal: result.withdrawal,
      wallet: result.wallet // Sending updated wallet back helps UI sync faster
    }
  });
});

/**
 * @desc    Get all withdrawals for the logged-in host
 * @route   GET /api/v1/withdrawals
 * @access  Private (Host only)
 */
exports.listMine = catchAsync(async (req, res, next) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 20));
  const skip = (page - 1) * limit;

  // Query specifically for the 'host' field as defined in your model
  const [items, total] = await Promise.all([
    WithdrawalRequest.find({ host: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    WithdrawalRequest.countDocuments({ host: req.user._id })
  ]);

  res.status(200).json({
    status: 'success',
    results: items.length,
    total,
    page,
    limit,
    data: {
      withdrawals: items
    }
  });
});
