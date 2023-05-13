import { dbConnection } from '../database/DbConnection.js';
export class ProductManager {
   
    dbConnection = new dbConnection()

    async connectToDB() {
        this.dbConnection.connectToDB()
    }

    async closeDB() {
        this.dbConnection.close()
    }


    async addProduct(name, price) {
        this.dbConnection.insertProduct(name, price)
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

    async updateProduct(id, name, price, customername, customerprename, customeraddress, customeremail, customerphone) {
        const filter = {"id": id}
        const update = {$set: {"name": name, "price": price, "customername": customername, "customerprename": customerprename, "customeraddress": customeraddress, "customeremail": customeremail, "customerphone": customerphone}}
        this.dbConnection.updateOne("articles", filter, update).then(
            r => { console.log("("+id+", "+name +", "+ price +") was updated!") })
    }

    async updateAllProducts(name, price, customername, customerprename, customeraddress, customeremail, customerphone) {
        const filter = {}
        const update = {$set: {"name": name, "price": price, "customername": customername, "customerprename": customerprename, "customeraddress": customeraddress, "customeremail": customeremail, "customerphone": customerphone}}
        this.dbConnection.updateMany("articles", filter, update).then(
            r => { console.log("All products were updated!") })
    }

    async deleteProduct(id) {
        const filter = {"id": id}
        this.dbConnection.deleteOne("articles", filter).then(
            r => { console.log("("+id+") was deleted!") })
    }

    async deleteAllProducts() {
        this.dbConnection.deleteMany("articles", {}).then(
            r => { console.log("All products were deleted!") })
    }

}