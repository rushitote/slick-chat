import * as bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import session from 'express-session'
import logger from 'morgan'
import passport from 'passport'
import * as path from 'path'
import { MODELS_DIR, ROUTES_DIR } from '../var/config'
import { globFiles } from '../helpers'
import MongoStore from 'connect-mongo'
import router from '../router'
import cors from 'cors'

const app: express.Express = express()

const ENVIRONMENT = process.env.ENVIRONMENT
for (const model of globFiles(MODELS_DIR)) {
  require(path.resolve(model))
}

app.set('views', path.join(__dirname, '../../src/views'))
app.set('view engine', 'pug')

const sessionConfig: session.SessionOptions = {
  saveUninitialized: true,
  resave: true,
  proxy: true,
  secret: process.env.SECRET || 'superdupersecret', //leaving this like this for now
  cookie: {
    secure: ENVIRONMENT === 'PRODUCTION',
    httpOnly: false,
    maxAge: 4 * 60 * 60 * 1000,

    sameSite: ENVIRONMENT === 'PRODUCTION' ? 'none' : 'lax', //required for chrome
  },
}

if (ENVIRONMENT === 'PRODUCTION') {
  try {
    sessionConfig.store = MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      touchAfter: 24 * 3600,
    })
  } catch (e) {
    console.log('Please set the database environment variables. Defaulting to Memory Store')
  }
}

const sessionMiddleware = session(sessionConfig)

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
  res.header('Access-Control-Allow-Origin', process.env.WEBSITE_URL)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../../src/public')))

app.use('/api/', router)

for (const route of globFiles(ROUTES_DIR)) {
  require(path.resolve(route)).default(app)
}

export default app
export { sessionMiddleware }
