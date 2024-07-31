import { Router } from "express";
import alunoController from "../controller/AlunoController.js";
import LoginRequired from '../middleware/LoginRequired.js'

const router = new Router()

router.get('/', alunoController.index)
router.post('/', LoginRequired, alunoController.store)
router.put('/:id', LoginRequired, alunoController.update)
router.get('/:id', alunoController.show)
router.delete('/:id', LoginRequired, alunoController.delete)

export default router