export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Pages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    CategoryId: {
      type: Sequelize.INTEGER
    },
    UserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    aboutUs: {
      type: Sequelize.TEXT
    },
    backdrop: {
      type: Sequelize.STRING
    },
    faq: {
      type: Sequelize.TEXT
    },
    company: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Pages')
};
