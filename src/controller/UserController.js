import { json } from 'sequelize'
import User from '../models/User.js'

class UserController{
  async store(req,res){
    try{
      const novoUser = await User.create(req.body)
      const{id, nome, email}= novoUser
      return res.status(201).json({id, nome, email})
    }catch(e){
      console.log(`erro de ${e}`)
      return res.status(400).json({
      errors: e.errors.map(e=>e.message)
    })
    }
  }

  async index (req, res){
    try{
      const users = await User.findAll({attributes: ['id', 'nome',  'email']})
      return res.status(200).json(users)
    }catch(e){
      return res.json(null)
    }
  }

  async show(req, res){
    try {
      const user = await User.findByPk(req.params.id)

      const{id, nome, email}= user
      return res.status(200).json({id, nome, email})
    } catch (e) {
      return res.json(null)
    }
  }

  async update(req, res){
    try {
      const user = await User.findByPk(req.userId)

      if(!user){
        return res.status(401).json([
          errors ['Usuario não existe']
        ])
      }

      const novosDados = await user.update(req.body)

      const{id, nome, email}= novosDados

      return res.status(200).json({id, nome, email})

    } catch (e) {
      console.log(e)
      return res.json(null)
    }
  }

  async delete(req, res){
    try {
      const user = await User.findByPk(req.userId)

      if(!user){
        return res.status(401).json([
          errors ['Usuario não existe']
        ])
      }

      await user.destroy(req.body)

      return res.status(200).json(null)

    } catch (e) {

      return res.json(null)
    }
  }
}

export default new UserController()