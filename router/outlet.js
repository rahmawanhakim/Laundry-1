const express = require("express")
const app = express()

// call model for outlet
const outlet = require("../models/index").outlet

// call auth

const auth = require("./login")

app.use(auth)

// middleware for allow the request from body (agar bisa membaca data yg dibody)
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// end-point akses data outlet dg method GET
app.get("/", async(req, res) => {
    outlet.findAll()
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// end-point akses data outlet berdasarkan 'id_outlet' tertentu dg method GET
app.get("/:id_outlet", async(req, res) => {
    outlet.findOne({where: {id_outlet: req.params.id_outlet}})
    .then(outlet => {
        res.json(outlet)
    })
    .catch(error => {
        res.json({message: error.message})
    })
})

// end-point add new outlet
app.post("/", async(req, res) => {
    // tampung data request yg akan dimasukkan
    let newOutlet = {
        lokasi : req.body.lokasi
    }

    // execute insert new outlet
    outlet.create(newOutlet)
    .then(result => {
        res.json({
            message: "Data Success",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// end-point mengubah data outlet dg method PUT
app.put("/", async(req, res) => {
    // key yg menunjukkan data yg akan diubah
    let param = {
        id_outlet: req.body.id_outlet
    }

    // tampung data request yg akan diubah
    let data = {
        lokasi: req.body.lokasi
    }

    // execute update data
    outlet.update(data, {where: param})
    .then(result => {
        res.json({
            message: "Data Updated",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// end-point menghapus data outlet berdasarkan 'id_outlet' dg method DELETE
app.delete("/:id_outlet", async(req, res) => {
    // tampung data yg akan dihapus
    let param = {
        id_outlet: req.params.id_outlet
    }

    // execute delete data
    outlet.destroy({where: param})
    .then(result => {
        res.json({
            message: "Data Deleted"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

module.exports = app