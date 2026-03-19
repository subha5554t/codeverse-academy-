// Static domain data served from the API
// In a production app this could be stored in MongoDB

const domains = [
  {
    id: 'frontend',
    icon: '🎨',
    title: 'Frontend Development',
    tagline: 'Build beautiful, interactive user interfaces',
    description: 'Frontend development is the craft of creating the visual and interactive elements that users directly experience. It combines design sensibility with technical precision to build fast, accessible, and delightful web applications.',
    tools: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Vite'],
    careers: ['Frontend Engineer', 'UI Developer', 'React Developer', 'Web Designer'],
    projects: ['Portfolio site', 'E-commerce UI', 'Dashboard app', 'Animation showcase'],
    technologies: [
      { name: 'HTML', description: 'Semantic structure and accessibility for the modern web' },
      { name: 'CSS', description: 'Styling, animations, and responsive layouts with modern CSS' },
      { name: 'JavaScript', description: 'Dynamic behavior and interactivity in the browser' },
      { name: 'React', description: 'Component-based UI library for scalable applications' },
      { name: 'Next.js', description: 'Production-grade React framework with SSR and routing' },
      { name: 'Tailwind CSS', description: 'Utility-first CSS framework for rapid UI development' },
    ],
  },
  {
    id: 'backend',
    icon: '⚙️',
    title: 'Backend Development',
    tagline: 'Power applications with robust server logic',
    description: 'Backend engineering is the invisible engine that drives web applications. You design APIs, handle business logic, manage authentication, process data, and ensure your application scales to millions of users.',
    tools: ['Node.js', 'Express.js', 'GraphQL', 'REST APIs', 'JWT', 'OAuth', 'Redis'],
    careers: ['Backend Engineer', 'API Developer', 'Node.js Developer', 'Systems Architect'],
    projects: ['REST API', 'Auth system', 'Real-time chat', 'Payment integration'],
    technologies: [
      { name: 'Node.js', description: 'JavaScript runtime for scalable server-side applications' },
      { name: 'Express.js', description: 'Minimal, flexible Node.js web application framework' },
      { name: 'REST APIs', description: 'Industry-standard architectural style for web services' },
      { name: 'GraphQL', description: 'Flexible query language for APIs with precise data fetching' },
      { name: 'Authentication', description: 'JWT, OAuth, sessions — securing your applications' },
    ],
  },
  {
    id: 'database',
    icon: '🗄️',
    title: 'Database Engineering',
    tagline: 'Design systems that store and retrieve data brilliantly',
    description: 'Data is the foundation of every application. Database engineers design schemas, optimize queries, ensure data integrity, and build systems that handle millions of read/write operations per second.',
    tools: ['MongoDB', 'PostgreSQL', 'Redis', 'Prisma', 'Mongoose', 'SQL', 'NoSQL'],
    careers: ['Database Administrator', 'Data Engineer', 'Backend Developer', 'DBA'],
    projects: ['Inventory system', 'Analytics DB', 'Social graph', 'Search engine'],
    technologies: [
      { name: 'MongoDB', description: 'Flexible, document-oriented NoSQL database for modern apps' },
      { name: 'PostgreSQL', description: 'Advanced relational database with powerful SQL features' },
      { name: 'Database Design', description: 'Schema design, normalization, indexing, and optimization' },
    ],
  },
  {
    id: 'fullstack',
    icon: '🚀',
    title: 'Full Stack Development',
    tagline: 'End-to-end mastery across the entire web stack',
    description: 'Full stack developers architect and build complete web applications — from database schema to pixel-perfect UI.',
    tools: ['MERN Stack', 'TypeScript', 'Docker', 'AWS', 'Vercel', 'Git', 'CI/CD'],
    careers: ['Full Stack Engineer', 'Startup CTO', 'Lead Developer', 'Tech Founder'],
    projects: ['SaaS platform', 'Social app', 'E-commerce site', 'Startup MVP'],
    technologies: [
      { name: 'MERN Stack', description: 'MongoDB, Express, React, Node — the most popular full stack combination' },
      { name: 'Authentication Systems', description: 'Complete auth flows: registration, login, JWT, OAuth, sessions' },
      { name: 'Deployment', description: 'Ship to production with Vercel, Railway, AWS, and CI/CD pipelines' },
    ],
  },
  {
    id: 'devops',
    icon: '☁️',
    title: 'DevOps & Cloud',
    tagline: 'Ship faster, scale effortlessly, automate everything',
    description: 'DevOps engineers bridge development and operations. They build automated pipelines, containerize applications, manage cloud infrastructure, and ensure high availability.',
    tools: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Terraform', 'Nginx', 'Vercel'],
    careers: ['DevOps Engineer', 'Cloud Architect', 'SRE', 'Platform Engineer'],
    projects: ['CI/CD pipeline', 'K8s cluster', 'AWS deployment', 'Monitoring stack'],
    technologies: [
      { name: 'Docker', description: 'Container platform for consistent, portable application deployment' },
      { name: 'CI/CD', description: 'Automated testing and deployment pipelines with GitHub Actions' },
      { name: 'AWS', description: 'Amazon Web Services — S3, EC2, Lambda, RDS and more' },
      { name: 'Kubernetes', description: 'Container orchestration for deploying and scaling applications' },
    ],
  },
  {
    id: 'web3',
    icon: '🔗',
    title: 'Web3 Development',
    tagline: 'Build the decentralized internet of tomorrow',
    description: 'Web3 developers build decentralized applications on blockchain networks. Smart contracts, DeFi protocols, NFT platforms, and DAOs.',
    tools: ['Solidity', 'Ethereum', 'Hardhat', 'ethers.js', 'IPFS', 'Metamask', 'OpenZeppelin'],
    careers: ['Smart Contract Developer', 'DeFi Engineer', 'Blockchain Developer', 'Web3 Architect'],
    projects: ['Token contract', 'NFT marketplace', 'DeFi protocol', 'DAO governance'],
    technologies: [
      { name: 'Blockchain Basics', description: 'Distributed ledgers, consensus mechanisms, cryptography' },
      { name: 'Smart Contracts', description: 'Self-executing code on the blockchain — trustless automation' },
      { name: 'Solidity', description: 'The primary programming language for Ethereum smart contracts' },
      { name: 'Ethereum', description: 'The world computer — programmable blockchain for dApps' },
      { name: 'DeFi Apps', description: 'Decentralized finance protocols — lending, DEXes, yield farming' },
    ],
  },
  {
    id: 'ai',
    icon: '🤖',
    title: 'Artificial Intelligence',
    tagline: 'Build intelligent systems that learn and adapt',
    description: 'AI/ML engineers build systems that can learn, reason, and make predictions. From image recognition to large language models.',
    tools: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'OpenAI API', 'LangChain', 'NumPy'],
    careers: ['ML Engineer', 'AI Developer', 'Data Scientist', 'Research Engineer'],
    projects: ['Image classifier', 'Chatbot', 'Recommendation engine', 'LLM app'],
    technologies: [
      { name: 'Python', description: 'The language of data science and machine learning' },
      { name: 'Machine Learning', description: 'Supervised, unsupervised, and reinforcement learning algorithms' },
      { name: 'Deep Learning', description: 'Neural networks, CNNs, RNNs, and transformers' },
      { name: 'TensorFlow', description: "Google's production ML framework for training and deploying models" },
      { name: 'AI Applications', description: 'Build real products with OpenAI, Anthropic, and open-source LLMs' },
    ],
  },
]

// GET /api/domains
export const getDomains = (req, res) => {
  try {
    const { id } = req.query
    if (id) {
      const domain = domains.find(d => d.id === id)
      if (!domain) {
        return res.status(404).json({ success: false, message: 'Domain not found' })
      }
      return res.json({ success: true, data: domain })
    }
    return res.json({ success: true, data: domains, total: domains.length })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' })
  }
}

// GET /api/domains/:id
export const getDomainById = (req, res) => {
  const domain = domains.find(d => d.id === req.params.id)
  if (!domain) {
    return res.status(404).json({ success: false, message: 'Domain not found' })
  }
  return res.json({ success: true, data: domain })
}
