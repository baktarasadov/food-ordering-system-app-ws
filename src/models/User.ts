import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnect';

export class User extends Model {
    public id!: number;
    public fullname!: String;
    public email!: String;
    public phoneNumber!: String;
    public job!: String;
    public address!: String;
    public password!: String;
    public file!: String;
    public role?: String;


}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,

        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        job: {
            type: DataTypes.STRING,
        },
        file: {
            type: DataTypes.STRING,

        },

        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        role: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'user',
        },
    },
    {
        sequelize,
        tableName: 'Users',
    }
);