const catchAsync = require('../utils/catchAsync');
const { getOrCreateWalletForHost } = require('../services/walletService');

exports.getMyWallet = catchAsync(async (req, res, next) => {
  // 1) Fetch the wallet for the current user
  const wallet = await getOrCreateWalletForHost(req.user._id);

  // 2) Send response with "flat" data properties
  // This matches what most frontends expect for a "My Wallet" page
  res.status(200).json({
    status: 'success',
    data: {
      id: wallet._id,
      availableBalance: wallet.availableBalance, // The ETB amount from Step 2
      pendingPayout: wallet.pendingPayout, // The ETB amount from Step 2
      availableBalanceCents: wallet.availableBalanceCents,
      pendingPayoutCents: wallet.pendingPayoutCents,
      currency: wallet.currency || 'ETB'
    }
  });
});
