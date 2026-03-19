import mongoose from 'mongoose'

const enrollmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    course: {
      type: String,
      required: [true, 'Course is required'],
    },
    courseRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      default: null,
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'completed', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded'],
      default: 'unpaid',
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

enrollmentSchema.index({ email: 1 })
enrollmentSchema.index({ course: 1 })
enrollmentSchema.index({ enrolledAt: -1 })

const Enrollment = mongoose.model('Enrollment', enrollmentSchema)
export default Enrollment
