import { createRequire } from "module"
const require = createRequire(import.meta.url)
const Offer = require('../schemas/OfferSchema.cjs')
const DbIdHandler = require('../../services/UniqueIDs.cjs')
const InputValidation = require('../../services/InputValidation.cjs')

export const offerDAO = {
    async insertOffer(product_id, seller_id) {
        try {
            var id = DbIdHandler.generateOfferId()
            const validOffer = await InputValidation.validateOffer(id, product_id, seller_id)
            const offer = await Offer.create(validOffer)
            await offer.save()
            return offer
        }
        catch(error) { return (error.message) }
    },
    async findOffer(operator, parameter) {
        const filter = { [operator]: parameter }
        return await Offer.findOne(filter);
    },
    async findAllOffers() {
        return await Offer.find();
    },
    async updateOffer(operator, parameter, update) {
        const filter = { [operator]: parameter }
        Offer.updateOne(filter, update).then(console.log("offer updated"))
        return true
    },
    async deleteOffer(operator, parameter) {
        const filter = { [operator]: parameter }
        Offer.deleteOne(filter).then(console.log("offer deleted"))
    },
    async deleteAllOffers() {
        await Offer.deleteMany().then(console.log("All offers deleted"))
    }
}