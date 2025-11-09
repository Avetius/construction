import { getDatabase } from '../utils/database'

export default defineEventHandler(async (event) => {
  try {
    // Initialize database on first health check
    const db = await getDatabase()
    
    // Test database connection
    const result = db.prepare('SELECT 1 as test').get()
    
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      test: result
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