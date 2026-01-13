import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  wasteType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  urgency: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    accuracy: Number,
    timestamp: String
  },
  images: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'assigned', 'completed', 'rejected'],
    default: 'pending'
  },
  assignedTruck: {
    type: String,
    default: null
  },
  assignedDriver: {
    type: String,
    default: null
  },
  adminNotes: {
    type: String,
    default: ''
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Report = mongoose.model('Report', reportSchema);

export default Report;
