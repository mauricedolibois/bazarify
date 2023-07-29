import { createRequire } from "module"
const require = createRequire(import.meta.url)
const Offer = require('../schemas/OfferSchema.cjs')
const DbIdHandler = require('../../services/UniqueIDs.cjs')
const InputValidation = require('../../services/InputValidation.cjs')

// Offer Data Access Object
export const offerDAO = {
    // insert a new offer into the database and return it (needs to be validated first); Input are seller_id and product_id
    async insertOffer(product_id, seller_id) {
        try {
            // generate a unique id for the offer
            var id = DbIdHandler.generateOfferId()
            // validate the input
            const validOffer = await InputValidation.validateOffer(id, product_id, seller_id)
            // insert the offer into the database
            const offer = await Offer.create(validOffer)
            await offer.save()
            return offer
        }
        catch(error) { return (error.message) }
    },
    // find an offer in the database by a given operator and parameter and return it
    async findOffer(operator, parameter) {
        const filter = { [operator]: parameter }
        return await Offer.findOne(filter);
    },
    // find all offers in the database and return them
    async findAllOffers() {
        return await Offer.find();
    },
    // update an offer in the database by a given operator and parameter and new values
    async updateOffer(operator, parameter, update) {
        const filter = { [operator]: parameter }
        Offer.updateOne(filter, update).then(console.log("offer updated"))
        return true
    },
    // delete an offer in the database by a given operator and parameter
    async deleteOffer(operator, parameter) {
        const filter = { [operator]: parameter }
        Offer.deleteOne(filter).then(console.log("offer deleted"))
    },
    // delete all offers in the database
    async deleteAllOffers() {
        await Offer.deleteMany().then(console.log("All offers deleted"))
    }
}