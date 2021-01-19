'use strict';
// models는 ORM을 통해 개발환경에서 MySQL를 다루기 위한 것
module.exports = (sequelize, DataTypes) => {
  var post = sequelize.define('post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    writer: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  return post;
};