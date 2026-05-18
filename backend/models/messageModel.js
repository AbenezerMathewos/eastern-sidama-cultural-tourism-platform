const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Message must have a sender']
    },
    recipient: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Message must have a recipient']
    },
    booking: {
      type: mongoose.Schema.ObjectId,
      ref: 'Booking'
    },
    experience: {
      type: mongoose.Schema.ObjectId,
      ref: 'Experience'
    },
    content: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
      maxlength: 2000
    },
    readAt: Date
  },
  { timestamps: true }
);

messageSchema.index({ sender: 1, recipient: 1, createdAt: -1 });
messageSchema.index({ recipient: 1, readAt: 1 });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
