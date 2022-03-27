const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())

const member = require("./router/member")
app.use("/laundry-1/api/member", member)

const user = require("./router/user")
app.use("/laundry-1/api/user", user)

const paket = require("./router/paket")
app.use("/laundry-1/api/paket", paket)

const transaksi = require("./router/transaksi")
app.use("/laundry-1/api/transaksi", transaksi)

const login = require("./router/login")
app.use("/laundry-1/api/auth", login)

const outlet = require("./router/outlet")
app.use("/laundry-1/api/outlet", outlet)

app.listen(8080, ()=> {
    console.log(`server on port 8080`);
})
