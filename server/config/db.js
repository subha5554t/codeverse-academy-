import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/codeverse_academy'

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    })

    console.log(`  ✅ MongoDB Connected: ${conn.connection.host}`)

    mongoose.connection.on('disconnected', () => {
      console.warn('  ⚠️  MongoDB disconnected. Attempting reconnect...')
    })

    mongoose.connection.on('error', (err) => {
      console.error('  ❌ MongoDB error:', err.message)
    })

  } catch (error) {
    console.error(`  ❌ MongoDB Connection Failed: ${error.message}`)
    console.error('  💡 Tip: Make sure MongoDB is running or set MONGODB_URI in .env')
    process.exit(1)
  }
}
