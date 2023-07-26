import { createRequire } from "module"
const require = createRequire(import.meta.url)
const Product = require('../schemas/ProductSchema.cjs')
const Seller = require('../schemas/SellerSchema.cjs')
const Offer = require('../schemas/OfferSchema.cjs')
const Info = require('../schemas/InfoSchema.cjs')

export const analyticsDAO = {
    async analytics() {
        try {
            const offers = await Offer.find()
            const products = await Product.find()
            const sellers = await Seller.find()
            const info = await Info.find()
            var soldProducts = 0
            var totalRevenue = 0
            var unsoldProducts = 0
            var totalOffers = 0
            for (var i = 0; i < offers.length; i++) {
                var offer = offers[i]
                var product = products.find(product => product.product_id == offer.product_id)
                if (offer.state == "sold") {
                    soldProducts++
                    totalRevenue += product.product_price
                }
                else {
                    unsoldProducts++
                }
                totalOffers++
            }
            var totalProducts = products.length
            var totalSellers = sellers.length
            var totalOffers = offers.length
            var provision = info[0].bazar_commission
            var tips = info[0].bazar_tips
            const analytics = {
                Revenue: totalRevenue,
                Provision: provision,
                Tips: tips,
                Offers: totalOffers,
                Sellers: totalSellers,
                Products: totalProducts,
                SoldProducts: soldProducts,
                UnsoldProducts: unsoldProducts
            }
            console.log(analytics)
            return analytics
        }
        catch(err) { console.log(err) }
    
    }
}