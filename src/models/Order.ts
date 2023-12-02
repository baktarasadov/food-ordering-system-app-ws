import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnect';
export class Order extends Model {
    public id !: number;
    public customer !: String;
    public address!: String;
    public total!: Number;
    public status!: Number;
    public method!: Number;
}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,

        },
        customer: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        method: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'Orders',
    }
);