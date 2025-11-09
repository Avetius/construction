import { db } from '../utils/database'

export default defineEventHandler(async (event) => {
  try {
    // Test database connection
    const result = db.prepare('SELECT 1 as test').get()
    
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.version
    }
  } catch (error) {
    setResponseStatus(event, 500)
    return {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
})