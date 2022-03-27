const express = require("express")
const app = express()

// call model for transaksi
const transaksi = require("../models/index").transaksi

// install md5
const md5 = require("md5")

// call auth
// call auth

// const auth = require("./login")

// app.use(auth)


// middleware for allow the request from body (agar bisa membaca data yg di body)
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// end-point akses data transaksi dg method GET
app.get("/", async(req, res) => {
    transaksi.findAll()
    .then(result => {
        res.json(result)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// end-point akses data transaksi berdasarkan 'id_transaksi' tertentu dg method GET
app.get("/:id_transaksi", async(req, res) => {
    transaksi.findOne({where: {id_transaksi: req.params.id_transaksi}})
    .then(transaksi => {
        res.json(transaksi)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})



// end-point menambah new transaksi dengan method POST
app.post("/", async(req, res) => {
    // tampung data request yang akan dimasukkan
    let newtransaksi = {
        id_member: req.body.id_member,
        tgl: req.body.tgl,
        batas_waktu: req.body.batas_waktu,
        tgl_bayar: req.body.tgl_bayar,
        status: req.body.status,
        dibayar: req.body.dibayar,
        id_user: req.body.id_user,
        id_outlet: req.body.id_outlet
    }

    // execute insert data
    transaksi.create(newtransaksi)
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

// end-point mengubah data transaksi dengan method PUT
app.put("/", async(req, res) => {
    // tampung data request yang akan diubah
    let data = {
        nama_transaksi: req.body.nama_transaksi,
        transaksiname: req.body.transaksiname,
        role: req.body.role
    }

    // key yg menunjukan data yg akan diubah
    let param = {
        id_transaksi: req.body.id_transaksi
    }

    // execute update data
    transaksi.update(data, {where: param})
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

// end-point menghapus data transaksi berdasarkan 'id_transaksi' dg method DELETE
app.delete("/:id_transaksi", async(req, res) => {
    // tampung data yg akan dihapus
    let param = {
        id_transaksi: req.params.id_transaksi
    }

    // execute delete data
    transaksi.destroy({where: param})
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