import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [80, 'Name must be under 80 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
    },
    course: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [2000, 'Message must be under 2000 characters'],
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'enrolled', 'closed'],
      default: 'new',
    },
    ipAddress: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Index for email lookups
studentSchema.index({ email: 1 })
studentSchema.index({ status: 1 })
studentSchema.index({ createdAt: -1 })

const Student = mongoose.model('Student', studentSchema)
export default Student
