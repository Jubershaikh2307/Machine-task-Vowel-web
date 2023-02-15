const express = require('express')
const CartModel = require('../Models/Cart.model');
const DataModel = require('../Models/Data.model');
const user = require('./User.routes');

// 63ebca2e26144c0aba9dbe61 user id

// 63ec6604a9c0a951b0d9181f product id

const cart = express()

cart.get("/:id", async (req, res) => {
    const { id } = req.params
    console.log(id);
    const data = await CartModel.find({ user_id: id }).populate(['product_id', 'user_id'])

    res.send(data)
})

cart.post("/add", async (req, res) => {

    const { user_id, product_id } = req.body

    let isProduct = await CartModel.findOne({ product_id, user_id })
    if (isProduct) {
        await CartModel.updateOne({ _id: isProduct._id }, { quantity: isProduct.quantity + 1 });
    }else{
        const new_cart = new CartModel({ user_id, product_id })
        await new_cart.save()
    }
})

cart.patch('/update/:id', async (req, res) => {
    const { product_id, user_id } = req.body;
    const id = req.params.id;
    try {
        let isProduct = await CartModel.findOne({ product_id, user_id })
        if (isProduct.quantity > 1) {
            await CartModel.updateOne({ _id: isProduct._id }, { quantity: isProduct.quantity - 1 });
        } else {
            await CartModel.deleteOne({ _id: id })
            res.send({ msg: "Item deleted from the cart successfully" })
        }
        res.send({ msg: "Item decreased from the cart successfully" });
    } catch (e) {
        res.status(500).send({ msg: "Something went wrong in the cart delete", e });
    }
});

cart.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await CartModel.findByIdAndDelete({ _id: id })
        res.send({ msg: "Item deleted from the cart successfully" })
    } catch (e) {
        res.status(500).send({ msg: "Something went wrong in the cart delete", e });
    }
});

module.exports = cart