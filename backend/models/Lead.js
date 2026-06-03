// backend/models/Lead.js
import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, default: 'N/A' },
  website: { type: String, default: 'N/A' },
  email: { type: String, default: 'Looking up...' },
  keyword: { type: String },
  country: { type: String },
  city: { type: String },
  specificArea: { type: String },
  extractedAt: { type: Date, default: Date.now }
}, { 
  // Automatically creates unique indices based on combination of name & phone to prevent cross-run clutter
  timestamps: true 
});

// Compound index to ensure we don't save duplicate businesses
LeadSchema.index({ name: 1, phone: 1 }, { unique: true });

export const Lead = mongoose.model('Lead', LeadSchema);