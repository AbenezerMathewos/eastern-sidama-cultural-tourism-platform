const mongoose = require('mongoose');
const slugify = require('slugify');

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'An experience must have a title'],
      unique: true,
      trim: true,
      maxlength: [
        100,
        'An experience title must have less or equal then 100 characters'
      ],
      minlength: [
        10,
        'An experience title must have more or equal then 10 characters'
      ]
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'An experience must have a description'],
      trim: true
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'An experience must have a summary']
    },
    price: {
      type: Number,
      required: [true, 'An experience must have a price']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
    },
    duration: {
      type: String,
      required: [true, 'An experience must have a duration']
    },
    maxGuests: {
      type: Number,
      required: [true, 'An experience must have a max guests number']
    },
    host: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'An experience must have a host']
    },
    location: {
      type: String,
      required: [true, 'An experience must have a location'],
      trim: true
    },
    locationCoordinates: {
      type: String,
      trim: true
    },
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number], // [Longitude, Latitude]
      address: String,
      description: String
    },
    images: [String],
    imageCover: {
      type: String,
      required: [true, 'An experience must have a cover image']
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    guideRequirement: {
      type: String,
      enum: ['required', 'optional', 'none'],
      default: 'optional'
    },
    approvedGuides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

experienceSchema.index({ price: 1, ratingsAverage: -1 });
experienceSchema.index({ slug: 1 });
experienceSchema.index({ startLocation: '2dsphere' });
experienceSchema.index({ host: 1 });
experienceSchema.index({ status: 1 });

experienceSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'experience',
  localField: '_id'
});

experienceSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  this.updatedAt = Date.now();
  next();
});

// QUERY MIDDLEWARE: Hide pending/rejected unless bypass flag is present
// experienceModel.js

experienceSchema.pre(/^find/, function(next) {
  const options = this.getOptions();

  // If the bypass flag is true, Mongoose will NOT add the {status: 'approved'} filter
  if (options && options.bypassApprovedFilter === true) {
    return next();
  }

  // DEFAULT: Only show approved experiences to everyone else
  this.find({ status: 'approved' });
  next();
});

experienceSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'host',
    select: 'name photo email assignedGuide'
  });
  this.populate({
    path: 'approvedGuides',
    select: 'name photo email location guideStatus'
  });
  next();
});

const Experience = mongoose.model('Experience', experienceSchema);
module.exports = Experience;
