import passport from 'passport'
import passportLocal from 'passport-local'

import Users from '../../sqlz/models/users'
import { addUser, checkUser, findById } from '../../sqlz/ops/users'
import { Request, Response, NextFunction } from 'express'

const LocalStrategy = passportLocal.Strategy

passport.serializeUser<any, any>((req, user, done) => {
  done(undefined, (user as any).userId)
})

passport.deserializeUser((userId, done) => {
  findById(userId, Users).then(user => {
    done(user.err, user.user)
  })
})

passport.use(
  new LocalStrategy((username, password, done) => {
    checkUser(username, password, Users)
      .then(user => {
        if (user.status) {
          return done(undefined, user.user)
        } else {
          return done(undefined, false, { message: user.err })
        }
      })
      .catch(err => {
        console.log('passportLocalError:', err)
      })
  })
)

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

export function create(req: Request, res: Response) {
  const { username, password } = req.body

  addUser(username, password)
    .then(result => {
      if (!result.status) {
        res.status(400).send({ err: result.err })
      } else {
        res.status(200).send('Successfully created user.')
      }
    })
    .catch(err => {
      console.log(err)
    })
}

export function login(req: Request, res: Response) {
  passport.authenticate(
    'local',
    {
      session: true,
      // failureRedirect: '/login',
      // successRedirect: '/home',
    },
    (err, user, info) => {
      if (err) {
        return res.status(400).json({ message: info.message })
      } else {
        req.logIn(user, err => {
          if (err) {
            return res.status(400).json({ message: info.message })
          } else {
            req.session.save()
            return res.status(200).json({ message: 'Successfully logged in.' })
          }
        })
      }
    }
  )(req, res)
}

export function logout(req, res) {
  req.logout()
  req.session.destroy()
  res.status(200).send('Logged out successfully')
}

export function getTestAuth(req: Request, res: Response) {
  isAuthenticated(req, res, () => {
    res
      .status(200)
      .send('Currently logged in.\n' + 'Username: ' + (req.user as any).username)
  })
}
