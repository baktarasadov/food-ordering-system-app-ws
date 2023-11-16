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
    public confirmPassword!: String;
    public emailVerified!: String;
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
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
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

        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        confirmPassword: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'user',
            unique: true
        }
    },
    {
        sequelize,
        tableName: 'Users',
    }
);