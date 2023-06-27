import {dbConnection} from './database/DbConnection.js'


export const exampleData = {
    async createExampleData() {
        this.createExampleBazars().then(this.createExampleOffers())
        
    },

    async deleteExampleData() {
    },

    async createExampleBazars() {
        var exampleBazar = {bazar_name: "Demo Ski Bazar", bazar_year: 2023, bazar_commission: 4, bazar_description: "Unser alljährlicher SkI Bazar in Laichingen. Hier finden Sie alles rund ums Skifahren."}

        var bazar = dbConnection.newDB(exampleBazar.bazar_name, exampleBazar.bazar_year, exampleBazar.bazar_commission, exampleBazar.bazar_description)
    },

    async createExampleProducts() {
        const exampleProductsSki = [
            { product_name: "Nordica Dobermann GSR 180cm", product_price: 600,  product_category: "Ski"},
            { product_name: "Atomic Redster G9 175cm", product_price: 450,  product_category: "Ski"},
            { product_name: "Head Rebels E-Speed", product_price: 500,  product_category: "Ski"},
            { product_name: "Poc Helm", product_price: 200,  product_category: "Helm"},
            { product_name: "Poc Brille", product_price: 79.99,  product_category: "Brille"},
            { product_name: "Völkl Renntiger", product_price: 50,  product_category: "Ski"},
            { product_name: "J Lindenberg Jacke", product_price: 300,  product_category: "Jacke"},
            { product_name: "Ziener Jacke grün", product_price: 120.50,  product_category: "Jacke"},
            { product_name: "Technica Cochise Team", product_price: 299.95,  product_category: "Skischuhe"},
            { product_name: "Schlitten", product_price: 5,  product_category: "Schlitten"},
          ];
          return exampleProductsSki
    },

    async createExampleSellers() {
        const exampleSellers = [
            {
              seller_name: "Bucher",
              seller_firstname: "Maik",
              seller_email: "max@example.com",
              seller_phone: "123456789"
            },
            {
              seller_name: "Dolibois",
              seller_firstname: "Maurice",
              seller_email: "maurice@example.com",
              seller_phone: "987654321"
            },
            {
              seller_name: "Beutel",
              seller_firstname: "Julius",
              seller_email: "julius@example.com",
              seller_phone: "456789123"
            },
            {
              seller_name: "Fellmeth",
              seller_firstname: "Julia",
              seller_email: "julia@example.com",
              seller_phone: "789123456"
            },
            {
              seller_name: "Barth",
              seller_firstname: "Oliver",
              seller_email: "oliver@example.com",
              seller_phone: "654321987"
            }
          ];
          return exampleSellers
    },
    
    async createExampleOffers() {
      await dbConnection.connectToDB()
        var db = await dbConnection.changeDB("Ski_Bazar").then({})
        var porducts = await this.createExampleProducts()
        var sellers = await this.createExampleSellers()
        var exampleOffers = []
        var k = 0
        console.log("Haaaallloooooooo")

        for (let i = 0; i < sellers.length; i++) {
            var seller = await dbConnection.insertSeller(sellers[i].seller_name, sellers[i].seller_firstname, sellers[i].seller_email, sellers[i].seller_phone)
            console.log(seller)
            var product1 = await dbConnection.insertProduct(porducts[k].product_name, porducts[k].product_price, porducts[k].product_category)
            var product2 = await dbConnection.insertProduct(porducts[k+1].product_name, porducts[k+1].product_price, porducts[k+1].product_category)
            var offer1 = await dbConnection.insertOffer(product1.product_id, seller.seller_id)
            var offer2 = await dbConnection.insertOffer(product2.product_id, seller.seller_id)
            exampleOffers.push(offer1)
            exampleOffers.push(offer2)
            k += 2
        }
    }
}