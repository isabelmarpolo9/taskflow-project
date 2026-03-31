import dotenv from 'dotenv'

dotenv.config()

if (!process.env.PORT) {
  throw new Error('El puerto no está definido en las variables de entorno')
}

export const config = {
  port: Number(process.env.PORT),
  nodeEnv: process.env.NODE_ENV ?? 'development',
}