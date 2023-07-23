import { createRequire } from "module"
const require = createRequire(import.meta.url)
const Info = require('./schemas/InfoSchema.cjs')

export const infoDAO = {
    async addTip(tip) {
        try {
            const info = await Info.find()
            //var newTip = info[0].bazar_tips + tip
            //console.log(newTip)
           // Info.updateMany({}, { bazar_tips: newTip }).then(console.log("tip added"))
           Info.updateMany({}, { bazar_tips: tip }).then(console.log("tip added"))
           return true
        }
        catch (err) { console.log(err) }
    }
}