const postings = require('../Data/postings')

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('postings',
      postings
      , {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('postings', null, {});
  }
};
