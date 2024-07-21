const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const carModel = require('./carModel');
const COMMON = require('./COMMON');

router.get('/', (req, res) => {
    res.send('vao api mobile');
});

router.get('/list', async (req, res) => {
    await mongoose.connect(COMMON.uri);
    let cars = await carModel.find();
    res.send(cars);
});

router.post('/add_xe', async (req, res) => {
    await mongoose.connect(COMMON.uri);
    let car = req.body;
    let kq = await carModel.create(car);
    let cars = await carModel.find();
    res.send(cars);
});

module.exports = router;
