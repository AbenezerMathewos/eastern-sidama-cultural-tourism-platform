const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Wallet must belong to a host'],
      unique: true // Ensures one wallet per host
    },
    availableBalanceCents: {
      type: Number,
      default: 0,
      min: [0, 'Available balance cannot be negative']
    },
    pendingPayoutCents: {
      type: Number,
      default: 0,
      min: [0, 'Pending payout cannot be negative']
    },
    currency: {
      type: String,
      enum: ['ETB'],
      default: 'ETB'
    },
    // Added for record keeping
    transactions: [
      {
        amount: Number,
        type: { type: String, enum: ['credit', 'debit'] },
        description: String,
        referenceId: String,
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  {
    timestamps: true,
    // This allows the virtuals below to be sent to the frontend
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// --- STEP 2: ADD VIRTUALS FOR FRONTEND VISIBILITY ---

// Convert cents to ETB for the "Available Balance" display in image_3bb21b.png
walletSchema.virtual('availableBalance').get(function() {
  return (this.availableBalanceCents / 100).toFixed(2);
});

// Convert cents to ETB for the "Pending Payout" display
walletSchema.virtual('pendingPayout').get(function() {
  return (this.pendingPayoutCents / 100).toFixed(2);
});

walletSchema.index({ host: 1 }, { unique: true });

const Wallet = mongoose.model('Wallet', walletSchema);
module.exports = Wallet;
