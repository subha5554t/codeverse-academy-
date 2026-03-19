import Razorpay from 'razorpay'
import crypto from 'crypto'
import Enrollment from '../models/Enrollment.model.js'
import { sendEnrollmentConfirmation, sendEnrollmentAlertToAdmin } from '../utils/email.js'

// Lazy-init so server starts even without Razorpay keys in dev
let razorpay = null
const getRazorpay = () => {
  if (!razorpay) {
    if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID.startsWith('rzp_test_xxx')) {
      throw new Error('Razorpay keys not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env')
    }
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  }
  return razorpay
}

// POST /api/payment/create-order
export const createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', course, name, email } = req.body

    if (!amount || !course || !email) {
      return res.status(400).json({
        success: false,
        message: 'amount, course, and email are required',
      })
    }

    const rz = getRazorpay()

    const order = await rz.orders.create({
      amount: Math.round(amount * 100), // Razorpay uses paise (₹1 = 100 paise)
      currency,
      receipt: `cv_${Date.now()}`,
      notes: { course, studentName: name, studentEmail: email },
    })

    return res.status(201).json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      },
    })
  } catch (error) {
    console.error('Create order error:', error.message)
    if (error.message.includes('not configured')) {
      return res.status(503).json({ success: false, message: error.message })
    }
    return res.status(500).json({ success: false, message: 'Payment initiation failed' })
  }
}

// POST /api/payment/verify
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      course,
      name,
      email,
    } = req.body

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed. Invalid signature.',
      })
    }

    // Check for duplicate
    const existing = await Enrollment.findOne({
      email: email.toLowerCase(),
      course,
      status: { $ne: 'cancelled' },
    })

    if (!existing) {
      await Enrollment.create({
        name: name || 'Student',
        email: email.toLowerCase(),
        course,
        status: 'active',
        paymentStatus: 'paid',
      })
    } else {
      await Enrollment.findByIdAndUpdate(existing._id, {
        status: 'active',
        paymentStatus: 'paid',
      })
    }

    // Send emails (non-blocking)
    Promise.allSettled([
      sendEnrollmentConfirmation({ name, email, course }),
      sendEnrollmentAlertToAdmin({ name, email, course }),
    ]).catch(err => console.error('Email error after payment:', err.message))

    return res.json({
      success: true,
      message: `Payment verified! You are enrolled in ${course}.`,
      data: {
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        course,
      },
    })
  } catch (error) {
    console.error('Verify payment error:', error.message)
    return res.status(500).json({ success: false, message: 'Payment verification error' })
  }
}

// GET /api/payment/key — expose public key to frontend
export const getKey = (_req, res) => {
  return res.json({
    success: true,
    keyId: process.env.RAZORPAY_KEY_ID || '',
  })
}
