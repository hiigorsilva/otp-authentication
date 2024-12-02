import cors from 'cors'
import express, { urlencoded } from 'express'
import helmet from 'helmet'
import { mainRouter } from './routes/main'
import { env } from './schemas/env'

// MIDDLEWARES
const server = express()
server.use(helmet())
server.use(cors())
server.use(urlencoded({ extended: true }))
server.use(express.json())

// ROUTES
server.use(mainRouter)

// START SERVER
const PORT = env.PORT || 3333
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
