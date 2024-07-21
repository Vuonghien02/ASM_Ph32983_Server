const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const COMMON = require('./COMMON');
const carModel = require('./carModel');
const apiMobile = require('./api');

// Cấu hình body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Kết nối tới MongoDB
const uri = COMMON.uri;
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Định nghĩa route chính
app.use('/api', apiMobile);

// Route chính
app.get('/', async (req, res) => {
    try {
        let cars = await carModel.find();
        res.send(cars);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Route thêm xe
app.post('/add_xe', async (req, res) => {
    try {
        let car = req.body;
        let kq = await carModel.create(car);
        let cars = await carModel.find();
        res.send(cars);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Route xóa xe
app.delete('/api/delete/:id', async (req, res) => {
    try {
        let id = req.params.id;
        await carModel.deleteOne({ _id: id });
        res.send({ message: 'Deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Route cập nhật xe
app.put('/api/update/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let updatedCar = req.body;
        await carModel.updateOne({ _id: id }, updatedCar);
        res.send({ message: 'Updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Lắng nghe trên cổng 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
