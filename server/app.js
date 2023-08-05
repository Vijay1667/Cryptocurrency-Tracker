const express = require('express')
const app = express()
const port = 3010
const cors = require("cors")
app.use(express.json())   
app.use(express.urlencoded({extended:true}))
app.use(cors({ origin: "http://localhost:3000" }))

var init24 = null
app.get("/api/home/", async (req, res) => {
    console.log("AF")
        // res.send(JSON.stringify(response))
        
            const req24 = await fetch('https://api.wazirx.com/sapi/v1/tickers/24hr')
            const resp24 = await req24.json()
            await res.send(resp24)
        

    // if(resp.status=="")
    // if()

    console.log("AF")
})
app.post("/api/eachcrypto/:id/", async (req, res) => {
    console.log("GOT REQ")
    console.log(req.params)
    console.log(req.body)
    
    const req24 = await fetch(`https://api.wazirx.com/sapi/v1/klines?`+new URLSearchParams({
        symbol:req.params.id,
        limit:req.body.limit,
        interval:req.body.interval
    }))
            const resp24 = await req24.json()
            await res.send(resp24)
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})