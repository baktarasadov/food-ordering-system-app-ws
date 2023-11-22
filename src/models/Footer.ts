import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnect';
export class Footer extends Model {
    public id!: number;
    public email!: String;
    public phoneNumber!: String;
    public location!: String;
    public description!: String;
    public openingDay!: String;
    public openingHour!: String;
}

Footer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,

        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        openingDay: {
            type: DataTypes.STRING,

        },

        openingHour: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    },
    {
        sequelize,
        tableName: 'Footers',
    }
);