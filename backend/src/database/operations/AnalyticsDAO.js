import { createRequire } from "module"
const require = createRequire(import.meta.url)
const Product = require('../schemas/ProductSchema.cjs')
const Seller = require('../schemas/SellerSchema.cjs')
const Offer = require('../schemas/OfferSchema.cjs')
const Info = require('../schemas/InfoSchema.cjs')

// Analytics Data Access Object
export const analyticsDAO = {
    // get analytics data from database and return it as an object with all the data needed for the analytics page
    async analytics() {
        try {
            // get all data from database
            const offers = await Offer.find()
            const products = await Product.find()
            const sellers = await Seller.find()
            const info = await Info.find()
            // calculate all the data needed
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
            // return all the data as an object
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