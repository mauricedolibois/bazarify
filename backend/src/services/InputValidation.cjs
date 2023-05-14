const Joi = require('joi')

module.exports = {

    validateProduct: async function(id, name, price, category){
    const schema = await Joi.object({
        product_id: Joi.number().required(),
        product_name: Joi.string().required(),
        product_price: Joi.number().integer().required(),
        product_category: Joi.string().required()
        });

        const validProduct = await schema.validateAsync({
            product_id: id,
            product_name: name,
            product_price: price,
            product_category: category
          }).catch(err => console.log(err.message))

        return validProduct
    },
    validateCustomer: async function(id, name, firstname, email, phone){
        
        const schema = await Joi.object({
            customer_id: Joi.number().required(),
            customer_name: Joi.string().required(),
            customer_firstname: Joi.string().required(),
            customer_email: Joi.string().required().regex(new RegExp(/^.*@.*\..*$/i)).message('Invalid email'),
            customer_phone: Joi.number().integer().required()
          });

          const validCustomer = await schema.validateAsync({
                customer_id: id,
                customer_name: name,
                customer_firstname: firstname,
                customer_email: email,
                customer_phone: phone
              }).catch(err => console.log(err.message))

            return validCustomer
    },
    validateSale: async function(id, product_id, customer_id){
        const schema = await Joi.object({
            order_id: Joi.number().required(),
            product_id: Joi.number().required(),
            customer_id: Joi.number().required()
            });

            const validSale = await schema.validateAsync({
                order_id: id,
                product_id: product_id,
                customer_id: customer_id
              }).catch(err => console.log(err.message))

            return validSale
    }

}
