import express from 'express'
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import HomeRoutes from './src/routes/HomeRoutes.js'
import userRoutes from './src/routes/UserRoutes.js'
import tokenRoutes from './src/routes/TokenRoutes.js'
import alunoRoutes from './src/routes/AlunoRoutes.js'
import FotoRoutes from './src/routes/FotoRoutes.js'

import './src/database/index.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class App{
  constructor(){
    this.app = express()
    this.middleware()
    this.routes()
  }

  middleware(){
    this.app.use(express.urlencoded({extended:true}))
    this.app.use(express.json())
    this.app.use(express.static(resolve(__dirname, 'uploads')))
  }

  routes(){
    this.app.use('/', HomeRoutes)
    this.app.use('/user/', userRoutes)
    this.app.use('/token/', tokenRoutes)
    this.app.use('/alunos/',alunoRoutes)
    this.app.use('/fotos/',FotoRoutes)
  }
}

export default new App().app
