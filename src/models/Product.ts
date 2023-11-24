import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnect';
import { Category } from './Category';
import { Json } from 'sequelize/types/utils';
export class Product extends Model {
    public productId!: number;
    public productName!: String;
    public description!: String;
    public price!: String;
    public img!: String;
    public extraOptions!: { title: String; price: String };



}

Product.init(
    {
        productId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,

        },
        productName: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        img: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        extraOptions: {
            type: DataTypes.JSONB,
        },

    },
    {
        sequelize,
        tableName: 'Porducts',
    }
);
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });