import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnect';
export class Category extends Model {
    public categoryId!: number;
    public categoryName!: String;
}

Category.init(
    {
        categoryId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,

        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },

    },
    {
        sequelize,
        tableName: 'Categories',
    }
);