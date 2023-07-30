import { createRequire } from "module"
const require = createRequire(import.meta.url)
import mongoose from 'mongoose'
const Info = require('./schemas/InfoSchema.cjs')
const InputValidation = require('../services/InputValidation.cjs')
var BazarName = "Bazarify"


// Database Connection and Operations between different Databases
export const dbConnection = {
    // connect to the database with global Variable Value BazarName (default: Bazarify) 
    async connectToDB() {
        const username = encodeURIComponent("maik");
        const password = encodeURIComponent("abc123");
        const clusterUrl = `mongo:27017/${BazarName}`;
        const uri = `mongodb://${username}:${password}@${clusterUrl}?authSource=admin`;
        await mongoose.connect(uri).then(console.log(`Connected to Database: ${BazarName}`)).catch(err => console.log(err))
    },
    // change the current database to the given new name
    async changeDB(newName) {
        BazarName = newName
        await this.close()
        await this.connectToDB()
        return "connected to " + BazarName
    },
    // create a new database(Bazar) with the name, year, commission and description 
    async newDB(newName, newYear, newCommission, newDescription) {
        try {
            newName = newName.replaceAll(" ", "_")
            // entry in Barazify Info which contains all Bazar Infos
            await this.close()
            BazarName = "Bazarify"
            await this.connectToDB()
            const validInfo = await InputValidation.validateInfo(newName, newYear, newCommission, newDescription)
            const info = await Info.create(validInfo)
            await info.save().then(console.log(info) + "saved")
            await this.close()

            // entry in DB Info of the new Bazar
            BazarName = newName
            await this.connectToDB()
            const validInfo2 = await InputValidation.validateInfo(newName, newYear, newCommission, newDescription)
            const info2 = await Info.create(validInfo2)
            await info2.save().then(console.log(info))
            //returns the new Bazar Info
            return info2

        }
        catch (error){ 
            console.log(error)
            return (error.message)
        }
    },
    // get all Bazars Infos from Bazarify Database
    async getBazars() {
        try {
            const currentDB = BazarName
            await this.close()
            BazarName = "Bazarify"
            await this.connectToDB()
            const info = await Info.find().catch(err => console.log(err))
            await this.close()
            BazarName = currentDB
            await this.connectToDB()
            return info
        }
        catch { console.log("could not get Bazars") }
    },
    // get the current Bazar Name
    async getCurrentBazar() {
        return BazarName
    },
    // delete the current Bazar
    async dropBazar(name) {
        try {
            const currentDB = BazarName
            await this.close()
            //delete the DB
            BazarName = name
            await this.connectToDB()
            await mongoose.connection.dropDatabase().then(console.log("DB dropped"))
            await this.close()
            // delete the Bazar Info from Bazarify
            BazarName = "Bazarify"
            await this.connectToDB()
            await Info.deleteOne({ bazar_name: name }).then(console.log("Info deleted"))
            await this.close()
            BazarName = currentDB
            await this.connectToDB()
            return true
        } catch { console.log("could not drop DB") }
    },
    async close() {
        await mongoose.connection.close().then(console.log("DB closed"))
    }
}