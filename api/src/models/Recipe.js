const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    summary: { type: DataTypes.TEXT, allowNull: false },
    
    stepByStep: { type: DataTypes.TEXT },
    healthScore: { type: DataTypes.INTEGER, allowNull: false },
    image: { type: DataTypes.TEXT },
  });
};
