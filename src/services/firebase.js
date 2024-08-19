import dotenv from 'dotenv';
dotenv.config();
import admin from 'firebase-admin'
import serviceAccount from '../config/firebase-key.js'

const BUCKET = process.env.BUCKET

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET
});

const bucket = admin.storage().bucket()

export const uploadImage = (req,res,next)=>{
  if(!req.file) return

  const imagem = req.file
  const nomeDoArquivo = Date.now() + '.' + imagem.originalname.split().pop();

  const file = bucket.file(nomeDoArquivo)

  const stream = file.createWriteStream({
      metadata:{
          contentType: imagem.mimetype
      },
  })

  stream.on('error',(e)=>{
      console.error(e)
  })

  stream.on('finish', async ()=>{

      await file.makePublic()

      req.file.firebaseUrl = `https//storage.googleapis.com/${BUCKET}/${nomeDoArquivo}`

      next()
  })

  stream.end(imagem.buffer)
}

