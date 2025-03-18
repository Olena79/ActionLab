import express, {
  Request,
  Response,
  NextFunction,
} from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import connectDB from './config/db'
import routes from './routes'

dotenv.config()

const app = express()

// Підключення до MongoDB
connectDB()

const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: '*',
    methods: 'GET,POST,DELETE',
    allowedHeaders: 'Content-Type',
  }),
)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Логування запитів
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

// Підключення маршрутів
app.use('/', routes)

// Обробка 404 помилки
app.use(
  (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Not Found' })
  },
)

// Глобальний обробник помилок
app.use(
  (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    res.status(err.status || 500).json({
      message: err.message,
      error:
        process.env.NODE_ENV === 'development' ? err : {},
    })
  },
)

// Сервер роздає статичні файли (якщо вони є)
app.use(express.static(path.join(__dirname, 'public')))

// Запуск сервера
app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}`,
  )
})

export default app
