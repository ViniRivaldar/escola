import express from 'express'
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'
import helmet from 'helmet'
import dotevn from 'dotenv';
dotevn.config()

import HomeRoutes from './src/routes/HomeRoutes.js'
import userRoutes from './src/routes/UserRoutes.js'
import tokenRoutes from './src/routes/TokenRoutes.js'
import alunoRoutes from './src/routes/AlunoRoutes.js'
import FotoRoutes from './src/routes/FotoRoutes.js'

import './src/database/index.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const whiteList = [
  "http://192.168.10.2:3000",
  "http://localhost:3000",
  "https://escola-r509.onrender.com"
  
]

const corsOptions = {
  origin: function (origin, callback) {
    if(whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

class App{
  constructor(){
    this.app = express()
    this.middleware()
    this.routes()
  }

  middleware(){
    this.app.use(cors(corsOptions))
    // this.app.use(cors())
    this.app.use(helmet())
    this.app.use(express.urlencoded({extended:true}))
    this.app.use(express.json())
    this.app.use('/images', express.static(resolve(__dirname, 'uploads', 'images')))
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
