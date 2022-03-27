'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.member, {
        foreignKey: "id_member",
        as:"member"
      })

      this.belongsTo(models.user, {
        foreignKey:"id_user",
        as : "user"
      })

      this.hasMany(models.detail_transaksi, {
        foreignKey:"id_transaksi",
        as: "detail_transaksi"
      })

      this.belongsTo(models.outlet, {
        foreignKey: "id_outlet",
        as : "outlet"
      }) 

    }
  };
  transaksi.init({

    id_transaksi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_member: DataTypes.INTEGER,
    tgl: DataTypes.DATE,
    batas_waktu: DataTypes.DATE,
    tgl_bayar: DataTypes.DATE,
    status: DataTypes.ENUM('Baru','Selesai'),
    dibayar: DataTypes.ENUM('Belum Dibayar','Sudah Dibayar'),
    id_user: DataTypes.INTEGER,
    id_outlet: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'transaksi',
    tableName: 'transaksi'
  });
  return transaksi;
};