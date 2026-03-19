import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { logger } from './middleware/logger'


dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())
app.use(logger)

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/', (req, res) => {
  res.json({ message: 'API de TaskFlow funcionando' })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
