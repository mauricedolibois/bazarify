import { dbConnection } from '../database/DbConnection.js';
export class ProductManager {
   
    dbConnection = new dbConnection()

    async connectToDB() {
        this.dbConnection.connectToDB()
    }

    async closeDB() {
        this.dbConnection.close()
    }

    async addProduct(id, name, price) {
        const doc = {"id": id, "name": name, "price": price }
        this.dbConnection.insertOne("articles", doc).then(
            r => { console.log("("+doc.id+", "+doc.name +", "+ doc.price +") was inserted!") })
    }

    async getProductById(id) {
        return await this.dbConnection.findOne("articles", {"id": id})
    }

    async getProductByName(name) {
        return await this.dbConnection.findOne("articles", {"name": name})
    }

    async getAllProducts() {
        return await this.dbConnection.findAll("articles")
    }

    async updateProduct(id, name, price) {
        const filter = {"id": id}
        const update = {$set: {"name": name, "price": price}}
        this.dbConnection.updateOne("articles", filter, update).then(
            r => { console.log("("+id+", "+name +", "+ price +") was updated!") })
    }

    async deleteProduct(id) {
        const filter = {"id": id}
        this.dbConnection.deleteOne("articles", filter).then(
            r => { console.log("("+id+") was deleted!") })
    }

}