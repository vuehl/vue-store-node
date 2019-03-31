var express = require('express')
var api = express.Router()

let goodsData = require('./../mock/goods.json')
api.get('/goods', function (req, res) {
    res.json(goodsData)
})

module.exports = api
