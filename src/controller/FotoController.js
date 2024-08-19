import multer from "multer";
import multerConfig from '../config/multerConfig.js';
import { uploadImage } from '../services/firebase.js';
import Foto from "../models/Foto.js";
import Aluno from "../models/Aluno.js";

const uploads = multer(multerConfig).single('foto');

class FotoController {
  async store(req, res) {
    return uploads(req, res, async (e) => {
      if (e) {
        return res.status(400).json({
          errors: [e.code],
        });
      }

      try {
        const { originalname } = req.file;
        const { aluno_id } = req.body;

        const aluno = await Aluno.findByPk(aluno_id);
        if (!aluno) {
          return res.status(400).json({
            errors: ['Aluno não existe'],
          });
        }

        await uploadImage(req, res, async () => {
          const firebaseUrl = req.file.firebaseUrl;

          const foto = await Foto.create({ originalname, filename: firebaseUrl, aluno_id });

          return res.status(201).json(foto);
        });

      } catch (error) {
        return res.status(400).json({
          errors: [error.message],
        });
      }
    });
  }
}

export default new FotoController();
