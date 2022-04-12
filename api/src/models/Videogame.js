const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allownull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_raw:{
      type: DataTypes.TEXT,
      allownull: false,
    },
    released:{
      type: DataTypes.STRING
    },
    rating:{
      type: DataTypes.DECIMAL
    },
    background_image:{
      type: DataTypes.STRING
    },
    platforms:{
      type: DataTypes.ARRAY( DataTypes.STRING),
      
    },    
    status:{
      type: DataTypes.ENUM('existing', 'added')
    },
    

  });
};
