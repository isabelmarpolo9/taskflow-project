import express from 'express'
import cors from 'cors'
import { config } from './config'
import { logger } from './middleware/logger'
import taskRoutes from './routes/task.routes'
import { errorHandler } from './middleware/errorHandler'

const app = express()
const PORT = config.port

app.use(cors())
app.use(express.json())
app.use(logger)

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/', (req, res) => {
  res.json({ message: 'API de TaskFlow funcionando' })
})

app.use('/api/v1/tasks', taskRoutes)

app.use(errorHandler)

//app.listen(PORT, () => {
//  console.log(`Servidor corriendo en http://localhost:${PORT}`)
//})

export default app