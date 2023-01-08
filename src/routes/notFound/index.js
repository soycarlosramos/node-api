import { Router } from 'express'
const router = Router()
import notFound from "../../controllers/notFound/index.js"

router.all('*', notFound)

export default router