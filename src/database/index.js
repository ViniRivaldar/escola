import Sequelize  from "sequelize";
import database from '../config/database.js'
import Aluno from "../models/Aluno.js";
import User from "../models/User.js";
import Foto from '../models/Foto.js'

const model = [Aluno, User, Foto]

const connection = new Sequelize(database)

model.forEach(model=>model.init(connection))
model.forEach(model=>model.associate && model.associate(connection.models))