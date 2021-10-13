import * as bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import session from 'express-session'
import logger from 'morgan'
import passport from 'passport'
import * as path from 'path'
import { MODELS_DIR, ROUTES_DIR } from '../var/config'
import { globFiles } from '../helpers'
import router from '../router'
import cors from 'cors'

const app: express.Express = express()

for (const model of globFiles(MODELS_DIR)) {
  require(path.resolve(model))
}

// DB && connect(DB)

app.set('views', path.join(__dirname, '../../src/views'))
app.set('view engine', 'pug')

const sessionMiddleware = session({
  saveUninitialized: true,
  resave: true,
  secret: 'no_secret', //leaving this like this for now
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 4 * 60 * 60 * 1000,
  },
})

app.use(sessionMiddleware)
app.use(passport.initialize())
app.use(passport.session())

app.use(
  cors({
    origin: true,
    credentials: true,
  })
)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001/')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../../src/public')))

app.use('/', router)

for (const route of globFiles(ROUTES_DIR)) {
  require(path.resolve(route)).default(app)
}

export default app
export { sessionMiddleware }
