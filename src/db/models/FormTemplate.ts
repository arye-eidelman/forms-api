import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import connection from "../connection";

class FormTemplate extends Model<InferAttributes<FormTemplate>, InferCreationAttributes<FormTemplate>> {
  declare slug: CreationOptional<string>;
  declare title: string;
  declare description: string | null;
  declare exceptingSubmissions: CreationOptional<boolean>;
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

FormTemplate.init({
  slug: {
    defaultValue: DataTypes.UUIDV4,
    type: DataTypes.STRING,
    allowNull: false
  },
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  exceptingSubmissions: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deletedAt: DataTypes.DATE
}, {
  sequelize: connection,
  modelName: 'formTemplate',
  paranoid: true,
});

export default FormTemplate;
