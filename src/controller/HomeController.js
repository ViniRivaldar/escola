import Aluno from '../models/Aluno.js'

class HomeController{
  async index(req,res){

    res.status(201).json("index")
  }
}

export default new HomeController()