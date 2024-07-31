import Aluno from '../models/Aluno.js'
import Foto from '../models/Foto.js'

class AlunoController{
  async index(req,res){
    const alunos = await Aluno.findAll({
      attributes:["id","nome","sobrenome","email","idade","peso", "altura"],
      order:[['id', 'DESC'], [Foto,'id', 'DESC']],
      include: {
        model:Foto,
        attributes:['url','filename']
      }
    })
    res.status(200).json(alunos)
  }

  async store(req,res){
    try {
      const novoAluno = await Aluno.create(req.body)

      return res.status(201).json(novoAluno)

    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }

  async update(req,res){
    try {
      const {id} = req.params

      if(!id){
        return res.status(400).json({
          errors: ['faltando o id']
        })
      }

      const aluno = await Aluno.findByPk(id)

      if(!aluno){
        return res.status(400).json({
          errors: ['aluno não existe']
        })
      }

      const alunoAtualizado = await aluno.update(req.body)

      return res.status(200).json(alunoAtualizado)

    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }

  async show(req,res){

    try {
      const {id} = req.params

      if(!id){
        return res.status(400).json({
          errors: ['faltando o id']
        })
      }

      const aluno = await Aluno.findByPk(id,{
        attributes:["id","nome","sobrenome","email","idade","peso", "altura"],
        order:[['id', 'DESC'], [Foto,'id', 'DESC']],
        include: {
          model:Foto,
          attributes:['url','filename']
        }
      })

      if(!aluno){
        return res.status(400).json({
          errors: ['aluno não existe']
        })
      }

      return res.status(200).json(aluno)

    } catch (e) {

      return res.status(400).json(e)
    }
  }

  async delete(req,res){
    try {
      const {id} = req.params

      if(!id){
        return res.status(400).json({
          errors: ['faltando o id']
        })
      }

      const aluno = await Aluno.findByPk(id)

      if(!aluno){
        return res.status(400).json({
          errors: ['aluno não existe']
        })
      }

      aluno.destroy()

      return res.status(200).json('ok')

    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }

}

export default new AlunoController()