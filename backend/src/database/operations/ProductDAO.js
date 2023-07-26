import { createRequire } from "module"
const require = createRequire(import.meta.url)
const Product = require('../schemas/ProductSchema.cjs')
const DbIdHandler = require('../../services/UniqueIDs.cjs')
const InputValidation = require('../../services/InputValidation.cjs')

export const productDAO = {
    async insertProduct(name, price, category) {
        try {
            var id = DbIdHandler.generateProductId()
            const validProduct = await InputValidation.validateProduct(id, name, price, category)
            const product = await Product.create(validProduct)
            await product.save()
            return product
        }
        catch(error) { return (error.message) }
    },
    async findProduct(operator, parameter) {
        const filter = { [operator]: parameter }
        return await Product.findOne(filter);
    },
    async findAllProducts() {
        return await Product.find();
    },
    async updateProduct(operator, parameter, update) {
        const filter = { [operator]: parameter }
        Product.findOneAndUpdate(filter, update).then(console.log("product updated"))
    },
    async deleteProduct(operator, parameter) {
        const filter = { [operator]: parameter }
        Product.deleteOne(filter).then(console.log("product deleted"))
    },
    async deleteAllProducts() {
        await Product.deleteMany().then(console.log("All products deleted"))
    }
}