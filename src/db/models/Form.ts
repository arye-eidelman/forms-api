import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import connection from "../connection";

class Form extends Model<InferAttributes<Form>, InferCreationAttributes<Form>> {
  declare slug: CreationOptional<string>;
  declare title: string;
  declare description: string | null;
  declare acceptingSubmissions: CreationOptional<boolean>;
  declare deletedAt: Date | null;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  // @ts-ignore
  static associate(models) {
    // define association here
  }
}

Form.init({
  slug: {
    defaultValue: DataTypes.UUIDV4,
    type: DataTypes.STRING,
    allowNull: false
  },
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  acceptingSubmissions: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deletedAt: DataTypes.DATE
}, {
  sequelize: connection,
  modelName: 'Form',
  tableName: 'forms',
  timestamps: true,
  paranoid: true
});

export default Form;
