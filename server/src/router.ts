import express from 'express'
const router = express.Router();
import *  as passportConfig from './controllers/auth'

router.post("/login", passportConfig.login);
router.post("/logout", passportConfig.logout);
router.post("/create", passportConfig.create);
router.get("/test-auth", passportConfig.getTest);

export default router;