const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const hasCloudinaryConfig =
  !!process.env.CLOUDINARY_CLOUD_NAME &&
  !!process.env.CLOUDINARY_API_KEY &&
  !!process.env.CLOUDINARY_API_SECRET;

// File filter to accept only images and PDFs
const fileFilter = (req, file, cb) => {
  // Accept images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  }
  // Accept PDFs for documents
  else if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images (JPEG, PNG, WEBP) and PDFs are allowed.'), false);
  }
};

const ensureDir = dirPath => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const localHostUploadDir = path.join(__dirname, '..', 'public', 'uploads', 'host-applications');
const localGuideUploadDir = path.join(__dirname, '..', 'public', 'uploads', 'guide-applications');
const localExperienceUploadDir = path.join(__dirname, '..', 'public', 'uploads', 'experiences');
ensureDir(localHostUploadDir);
ensureDir(localGuideUploadDir);
ensureDir(localExperienceUploadDir);

const makeLocalDiskStorage = destination =>
  multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, destination);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname || '').toLowerCase() || '.bin';
      const safeField = (file.fieldname || 'file').replace(/[^a-zA-Z0-9_-]/g, '');
      cb(null, `${safeField}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    }
  });

// Storage configuration for host application media
const hostMediaStorage = hasCloudinaryConfig
  ? new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: 'etxplore/host-applications',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'pdf'],
        transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
        resource_type: 'auto'
      }
    })
  : makeLocalDiskStorage(localHostUploadDir);

// Storage configuration for guide application media
const guideMediaStorage = hasCloudinaryConfig
  ? new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: 'etxplore/guide-applications',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'pdf'],
        transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
        resource_type: 'auto'
      }
    })
  : makeLocalDiskStorage(localGuideUploadDir);

// Storage configuration for experience images
const experienceImageStorage = hasCloudinaryConfig
  ? new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: 'etxplore/experiences',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 1400, height: 1000, crop: 'limit' }],
        resource_type: 'image'
      }
    })
  : makeLocalDiskStorage(localExperienceUploadDir);

// Multer upload configuration
const uploadHostMedia = multer({
  storage: hostMediaStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

const uploadGuideMedia = multer({
  storage: guideMediaStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

const uploadExperienceImage = multer({
  storage: experienceImageStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      return cb(null, true);
    }

    return cb(new Error('Invalid file type. Only images are allowed.'), false);
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = {
  cloudinary,
  uploadHostMedia,
  uploadGuideMedia,
  uploadExperienceImage
};
