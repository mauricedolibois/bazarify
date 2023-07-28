import { createRequire } from "module"
const require = createRequire(import.meta.url)
const Info = require('../schemas/InfoSchema.cjs')

export const infoDAO = {
    async addTip(tip) {
        try {
           const info = await Info.find()
           Info.updateMany({}, { bazar_tips: tip }).then(console.log("tip added"))
           return true
        }
        catch (err) { console.log(err) }
    }
}