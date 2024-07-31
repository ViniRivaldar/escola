import multer from "multer";
import multerConfig from '../config/multerConfig.js';
import Foto from "../models/Foto.js";

const uploads = multer(multerConfig).single('foto');

class FotoController{
  async store(req,res){
    return uploads(req,res, async(e)=>{
      if(e){
        return res.status(400).json({
          errors: [e.code]
        })
      }

      try {
        const {originalname, filename} = req.file
        const {aluno_id} = req.body
        const foto = await Foto.create({originalname, filename,aluno_id})

        return res.status(201).json(foto)

      } catch (e) {
        return res.status(400).json({
          errors: ['aluno não existe']
        })

      }
    })
  }
}

export default new FotoController()