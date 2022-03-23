const accounts = require('../Data/accounts')

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('accounts',
      accounts
      , {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('accounts', null, {});
  }
};
