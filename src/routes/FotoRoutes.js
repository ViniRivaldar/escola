import { Router } from "express";

import FotoController from "../controller/FotoController.js";
import loginRequire from '../middleware/LoginRequired.js'

const router = new Router();

router.post('/', loginRequire, FotoController.store);

export default router;