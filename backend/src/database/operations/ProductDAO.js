import { createRequire } from "module"
const require = createRequire(import.meta.url)
const Product = require('../schemas/ProductSchema.cjs')
const DbIdHandler = require('../../services/UniqueIDs.cjs')
const InputValidation = require('../../services/InputValidation.cjs')

// Product Data Access Object
export const productDAO = {
    // insert a new product into the database and return it (needs to be validated first); Input are name, price and category
    async insertProduct(name, price, category) {
        try {
            // generate a unique id for the product
            var id = DbIdHandler.generateProductId()
            // validate the input
            const validProduct = await InputValidation.validateProduct(id, name, price, category)
            // insert the product into the database
            const product = await Product.create(validProduct)
            await product.save()
            return product
        }
        catch(error) { return (error.message) }
    },
    // find a product in the database by a given operator and parameter and return it
    async findProduct(operator, parameter) {
        const filter = { [operator]: parameter }
        return await Product.findOne(filter);
    },
    // find all products in the database and return them
    async findAllProducts() {
        return await Product.find();
    },
    // update a product in the database by a given operator and parameter and new values
    async updateProduct(operator, parameter, update) {
        const filter = { [operator]: parameter }
        Product.findOneAndUpdate(filter, update).then(console.log("product updated"))
    },
    // delete a product in the database by a given operator and parameter
    async deleteProduct(operator, parameter) {
        const filter = { [operator]: parameter }
        Product.deleteOne(filter).then(console.log("product deleted"))
    },
    // delete all products in the database
    async deleteAllProducts() {
        await Product.deleteMany().then(console.log("All products deleted"))
    }
}