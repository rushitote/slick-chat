import { sync } from 'glob'
import { union } from 'lodash'
import * as path from 'path'
import { forEach } from 'lodash'
import { Request, Response } from 'express'

export const globFiles = (location: string): string[] => {
  return union([], sync(location))
}

export function checkIfAuthenticated(req: Request, res: Response) {
  if (!req.isAuthenticated()) {
    res.status(401).send({ msg: 'Unauthenticated request' })
    return false
  }
  return true
}
