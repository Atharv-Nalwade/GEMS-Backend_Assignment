'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.removeColumn('Users', 'profilePicture');
    await queryInterface.addColumn('Users', 'profilePicture', {
      type: Sequelize.BLOB('long'),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'profilePicture');
  },
};
