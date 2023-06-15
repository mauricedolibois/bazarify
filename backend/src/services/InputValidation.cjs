const Joi = require('joi')

module.exports = {

    validateProduct: async function(id, name, price, category){
    const schema = await Joi.object({
        product_id: Joi.number().required(),
        product_name: Joi.string().required().error(new Error('Überprüfe deinen Input bei Produktname')),
        product_price: Joi.number().integer().required().error(new Error('Überprüfe deinen Input bei Preis (nur Zahlen)')),
        product_category: Joi.string().required().error(new Error('Überprüfe deinen Input bei Produkt Kategorie'))
        });

        const validProduct = await schema.validateAsync({
            product_id: id,
            product_name: name,
            product_price: price,
            product_category: category
          }).catch(err => {return err.message})

        return validProduct
    },
    validateSeller: async function(id, name, firstname, email, phone){
        
        const schema = await Joi.object({
            seller_id: Joi.number().required(),
            seller_name: Joi.string().required().error(new Error('Überprüfe deinen Input bei Nachname')),
            seller_firstname: Joi.string().required().error(new Error('Überprüfe deinen Input bei Vorname')),
            seller_email: Joi.string().required().regex(new RegExp(/^.*@.*\..*$/i)).message('Gebe eine gültige Email ein'),
            seller_phone: Joi.number().integer().required().error(new Error('Überprüfe deinen Input bei Telefonnummer (nur Zahlen)'))
          });

          const validSeller = await schema.validateAsync({
            seller_id: id,
            seller_name: name,
            seller_firstname: firstname,
            seller_email: email,
            seller_phone: phone
              }).catch(err => {return err.message})

            return validSeller
    },
    validateOffer: async function(id, product_id, seller_id){
        const schema = await Joi.object({
            offer_id: Joi.number().required(),
            product_id: Joi.number().required(),
            seller_id: Joi.number().required()
            });

            const validOffer = await schema.validateAsync({
                offer_id: id,
                product_id: product_id,
                seller_id: seller_id
              }).catch(err => {return err.message})

            return validOffer
    },
    validateInfo: async function(name, year , commission, description){
        const schema = await Joi.object({
            bazar_name: Joi.string().required().error(new Error('Überprüfe deinen Input bei Name')),
            bazar_year: Joi.number().integer().required().error(new Error('Überprüfe deinen Input bei Jahr')),
            bazar_commission: Joi.number().integer().required().min(0).max(100).error(new Error('Überprüfe deinen Input bei der Provision (nur Zahlen von 0-100)')),
            bazar_description: Joi.string().error(new Error('Überprüfe deinen Input bei der Beschreibung'))
            });

            const validInfo = await schema.validateAsync({
                bazar_name: name,
                bazar_year: year,
                bazar_commission: commission,
                bazar_description: description
              }).catch(err => {return err.message})

            return validInfo
            }
}
