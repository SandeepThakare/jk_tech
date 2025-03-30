const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const { Document } = require('../../documents/models/document.model');

const IngestionStatus = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed"
};

class IngestionJob extends Model { }

IngestionJob.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: {
    type: DataTypes.ENUM,
    values: Object.values(IngestionStatus),
    defaultValue: IngestionStatus.PENDING
  },
  error: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'IngestionJob'
});

IngestionJob.belongsTo(Document);

module.exports = { IngestionJob, IngestionStatus }; 