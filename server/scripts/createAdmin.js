import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.model.js'

dotenv.config()

const createAdmin = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/codeverse_academy'
    await mongoose.connect(uri)
    console.log('✅ Connected to MongoDB')

    const email = process.env.ADMIN_EMAIL_LOGIN || 'subhadipmahanty@gmail.com'
    const name  = process.env.ADMIN_NAME        || 'Subhadip Mahanty'
    const password = process.env.ADMIN_PASSWORD || 'Admin@CodeVerse2025'

    // Check if already exists
    const existing = await User.findOne({ email })
    if (existing) {
      if (existing.role !== 'admin') {
        existing.role = 'admin'
        await existing.save()
        console.log(`✅ Upgraded existing user to admin: ${email}`)
      } else {
        console.log(`ℹ️  Admin already exists: ${email}`)
      }
      await mongoose.disconnect()
      process.exit(0)
    }

    await User.create({ name, email, password, role: 'admin' })

    console.log(`
  ╔══════════════════════════════════════════════╗
  ║          ✅ Admin Created Successfully       ║
  ╠══════════════════════════════════════════════╣
  ║  Name:     ${name.padEnd(33)}║
  ║  Email:    ${email.padEnd(33)}║
  ║  Password: ${password.padEnd(33)}║
  ║  Role:     admin                             ║
  ╠══════════════════════════════════════════════╣
  ║  Login at: http://localhost:3000/login       ║
  ║  Dashboard: http://localhost:3000/admin      ║
  ╚══════════════════════════════════════════════╝
    `)

    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('❌ Create admin failed:', error.message)
    process.exit(1)
  }
}

createAdmin()
