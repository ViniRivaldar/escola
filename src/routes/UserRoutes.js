import { Router } from "express";
import userController from "../controller/UserController.js";

import LoguinRequired from '../middleware/LoginRequired.js'

const router = new Router()

// router.get('/', userController.index)
// router.get('/:id', userController.show)

router.post('/', LoguinRequired, userController.store)
router.put('/', LoguinRequired, userController.update)
router.delete('/', LoguinRequired, userController.delete)

export default router