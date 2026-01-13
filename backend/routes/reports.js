import express from 'express';
import Report from '../models/Report.js';
import { protect, adminOnly } from '../middleware/auth.js';
import multer from 'multer';
import sharp from 'sharp';

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(file.originalname.toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype || extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
});

// Create a new report (User)
router.post('/', protect, upload.array('images', 5), async (req, res) => {
  try {
    const { name, email, phone, wasteType, description, urgency, location } = req.body;

    // Parse location if it's a string
    const locationData = typeof location === 'string' ? JSON.parse(location) : location;

    // Convert images to WebP format and base64
    const images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          // Convert image to WebP format and compress
          const webpBuffer = await sharp(file.buffer)
            .webp({ quality: 80 })
            .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
            .toBuffer();
          
          // Convert to base64
          const base64Image = `data:image/webp;base64,${webpBuffer.toString('base64')}`;
          images.push(base64Image);
        } catch (error) {
          console.error('Error converting image:', error);
        }
      }
    }

    const report = await Report.create({
      userId: req.user._id,
      name,
      email,
      phone,
      wasteType,
      description,
      urgency,
      location: locationData,
      images
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all reports (Admin)
router.get('/admin/all', protect, adminOnly, async (req, res) => {
  try {
    const reports = await Report.find().populate('userId', 'name email phone').sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's own reports
router.get('/user/my-reports', protect, async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single report
router.get('/:id', protect, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate('userId', 'name email phone');
    
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Check if user owns the report or is admin
    if (req.userRole !== 'admin' && report.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this report' });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update report status (Admin)
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status, assignedTruck, assignedDriver, adminNotes } = req.body;

    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    report.status = status || report.status;
    report.assignedTruck = assignedTruck || report.assignedTruck;
    report.assignedDriver = assignedDriver || report.assignedDriver;
    report.adminNotes = adminNotes || report.adminNotes;

    const updatedReport = await report.save();
    res.json(updatedReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify report completion (User)
router.put('/:id/verify', protect, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Check if user owns the report or allow for now (for testing)
    // Uncomment the check below in production
    // if (req.userRole !== 'admin' && report.userId.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ message: 'Not authorized to verify this report' });
    // }

    if (report.status !== 'completed') {
      return res.status(400).json({ message: 'Can only verify completed reports' });
    }

    report.verified = true;
    const updatedReport = await report.save();
    res.json(updatedReport);
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete report (Admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    await report.deleteOne();
    res.json({ message: 'Report deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
