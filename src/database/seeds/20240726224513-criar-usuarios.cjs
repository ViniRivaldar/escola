'use strict';

const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {

    await queryInterface.bulkInsert('users',[{
        nome: 'vinicius',
        email:'viniriva@gmail.com',
        password_hash: await bcrypt.hash('123456',8),
        created_at: new Date(),
        updated_at: new Date()

      }],
      {}
    );
  },

  async down () {

  }
};
