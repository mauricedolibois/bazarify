import { createRequire } from "module"
const require = createRequire(import.meta.url)
import mongoose from 'mongoose'
const Info = require('./schemas/InfoSchema.cjs')
const InputValidation = require('../services/InputValidation.cjs')
var BazarName = "Bazarify"


// Connection to DB 
export const dbConnection = {
    async connectToDB() {
        const username = encodeURIComponent("maik");
        const password = encodeURIComponent("abc123");
        const clusterUrl = `127.0.0.1:27017/${BazarName}`;
        const uri = `mongodb://${username}:${password}@${clusterUrl}?authSource=admin`;
        await mongoose.connect(uri).then(console.log(`Connected to Database: ${BazarName}`)).catch(err => console.log(err))
    },
    async changeDB(newName) {
        BazarName = newName
        await this.close()
        await this.connectToDB()
        return "connected to " + BazarName
    },
    async newDB(newName, newYear, newCommission, newDescription) {
        try {
            newName = newName.replaceAll(" ", "_")
            // entry in Barazify Info
            await this.close()
            BazarName = "Bazarify"
            await this.connectToDB()
            const validInfo = await InputValidation.validateInfo(newName, newYear, newCommission, newDescription)
            const info = await Info.create(validInfo)
            await info.save().then(console.log(info) + "saved")
            await this.close()

            // entry in DB Info
            BazarName = newName
            await this.connectToDB()
            const validInfo2 = await InputValidation.validateInfo(newName, newYear, newCommission, newDescription)
            const info2 = await Info.create(validInfo2)
            await info2.save().then(console.log(info))
            return info2

        }
        catch (error){ 
            console.log(error)
            return (error.message)
        }
    },
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
    async getCurrentBazar() {
        return BazarName
    },
    async dropBazar(name) {
        try {
            const currentDB = BazarName
            await this.close()
            BazarName = name
            await this.connectToDB()
            await mongoose.connection.dropDatabase().then(console.log("DB dropped"))
            await this.close()
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