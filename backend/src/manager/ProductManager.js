import { dbConnection } from '../database/dbConnection.js';
export class ProductManager {
   
    static dbConnection = new dbConnection()

    static async connectToDB() {
        this.dbConnection.connectToDB()
    }

    static async addProduct(name, price) {
        const doc = {"name": name, "price": price }
        this.dbConnection.insertOne("articles", doc).then(
            r => { console.log("("+doc.name +", "+ doc.price +") was inserted!") })
    }

    static async getProductById(id) {
        return await this.dbConnection.findOne("articles", {"_id": id})
    }

}