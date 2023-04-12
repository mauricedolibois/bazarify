const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json({"backendData": [  "Das", "Kommt", "ausm", "Backend!"] })
})

app.listen(5000, () => { console.log("Server started on port 5000") })