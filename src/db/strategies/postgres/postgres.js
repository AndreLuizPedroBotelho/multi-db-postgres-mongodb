const ICrud = require('./../interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends ICrud {
    constructor(connection, schema) {
        super()
        this._connection = connection
        this._schema = schema
    }

    async isConnected() {
        try {
            await this._connection.autheticated;
            return true;

        } catch (error) {
            console.error('fail', error);
            return false;
        }
    }

    static async defineModal(connection, schema) {
        console.log('ss',schema)

        const model = connection.define(
            schema.name, schema.schema, schema.options
        )

        await model.sync()
        return model;
    }

    async update(id, item) {
        return this._schema.update(item, { where: { id: id } })
    }

    async delete(id) {
        const query = id ? { id } : {};
        return this._schema.destroy({ where: query })
    }

    async create(item) {
        const {
            dataValues
        } = await this._schema.create(item)

        return dataValues
    }

    async read(item) {
        return this._schema.findAll({ where: item, raw: true })
    }

    static async connect() {
        const connection = new Sequelize(
            'tb_herois',
            'postgres',
            'Postgres2019!',
            {
                host: 'localhost',
                port: 1568,
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false
            }
        )
        return connection;
    }
}

module.exports = Postgres