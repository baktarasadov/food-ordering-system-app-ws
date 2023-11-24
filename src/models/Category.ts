import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnect';
export class Category extends Model {
    public id!: number;
    public title!: String;
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,

        },
        title: {
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