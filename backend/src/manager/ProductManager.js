import { dbConnection } from '../database/DbConnection.js';
export class ProductManager {
   
    static dbConnection = new dbConnection()

    static async connectToDB() {
        this.dbConnection.connectToDB()
    }

    static async addProduct(id, name, price) {
        const doc = {"id": id, "name": name, "price": price }
        this.dbConnection.insertOne("articles", doc).then(
            r => { console.log("("+doc.id+", "+doc.name +", "+ doc.price +") was inserted!") })
    }

    static async getProductById(id) {
        return await this.dbConnection.findOne("articles", {"id": id})
    }

}