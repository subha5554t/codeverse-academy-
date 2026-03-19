import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Course from '../models/Course.model.js'

dotenv.config()

const seedCourses = [
  {
    title: 'MERN Stack Bootcamp',
    description: 'Build production-ready full-stack apps with MongoDB, Express, React, and Node.js. Ship real projects from day one.',
    duration: '16 weeks',
    level: 'Intermediate',
    price: 299,
    image: '🚀',
    badge: 'Bestseller',
    rating: 4.9,
    studentsCount: 2840,
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'JWT Auth', 'Deployment'],
  },
  {
    title: 'Full Stack Developer',
    description: 'A comprehensive path from zero to job-ready full stack engineer. Covers frontend, backend, databases, and DevOps.',
    duration: '24 weeks',
    level: 'Beginner',
    price: 399,
    image: '⚡',
    badge: 'Most Popular',
    rating: 4.8,
    studentsCount: 4120,
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'SQL', 'Docker', 'AWS'],
  },
  {
    title: 'React Masterclass',
    description: 'Deep-dive into React ecosystem. Hooks, performance optimization, state management, testing, and modern patterns.',
    duration: '10 weeks',
    level: 'Intermediate',
    price: 199,
    image: '⚛️',
    badge: 'Top Rated',
    rating: 4.9,
    studentsCount: 3650,
    skills: ['React 18', 'Hooks', 'Redux', 'React Query', 'TypeScript', 'Testing', 'Next.js'],
  },
  {
    title: 'Backend Engineering',
    description: 'Build scalable, secure backend systems with Node.js, design REST and GraphQL APIs, and master database architecture.',
    duration: '12 weeks',
    level: 'Intermediate',
    price: 249,
    image: '🔧',
    badge: null,
    rating: 4.8,
    studentsCount: 1980,
    skills: ['Node.js', 'Express', 'GraphQL', 'PostgreSQL', 'Redis', 'Auth', 'Microservices'],
  },
  {
    title: 'Web3 Development',
    description: 'Learn blockchain fundamentals, smart contract development with Solidity, DeFi protocols, and ship your first dApp.',
    duration: '14 weeks',
    level: 'Intermediate',
    price: 349,
    image: '🔗',
    badge: 'New',
    rating: 4.7,
    studentsCount: 1340,
    skills: ['Solidity', 'Ethereum', 'Hardhat', 'ethers.js', 'IPFS', 'DeFi', 'NFTs'],
  },
  {
    title: 'AI for Developers',
    description: 'Integrate AI/ML into your applications. Build with Python, TensorFlow, PyTorch and modern LLM APIs.',
    duration: '12 weeks',
    level: 'Intermediate',
    price: 299,
    image: '🤖',
    badge: 'Trending',
    rating: 4.9,
    studentsCount: 2210,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI API', 'LangChain', 'ML', 'Deep Learning'],
  },
]

const seed = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/codeverse_academy'
    await mongoose.connect(uri)
    console.log('✅ Connected to MongoDB')

    // Clear existing courses
    await Course.deleteMany({})
    console.log('🗑️  Cleared existing courses')

    // Insert seed data
    const inserted = await Course.insertMany(seedCourses)
    console.log(`🌱 Seeded ${inserted.length} courses`)

    inserted.forEach(c => console.log(`   → ${c.title} ($${c.price})`))

    await mongoose.disconnect()
    console.log('\n✅ Seed complete! Run: node server.js\n')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seed failed:', error.message)
    process.exit(1)
  }
}

seed()
