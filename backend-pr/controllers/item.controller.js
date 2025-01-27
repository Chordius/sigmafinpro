const Item = require("../models/items.model.js");

const createItem = async (req, res) => {
    try {
        var makeItem = req.body;
        const makeAccount = await Item.create(makeItem);
        res.status(200).json({success: 'true', message: 'true', data: makeAccount})
    } catch (error) {
        res.status(500).json({success: 'false', message: error.message})
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const profileAccountDelete = await Item.findByIdAndDelete(id);
        if (!profileAccountDelete) {
            return res.status(404).json({message: "Item not found"})
        }
        res.status(200).json({success: 'true', message: "Item deleted successfully!", data: profileAccountDelete})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getItemAll = async (req, res) => {
    try {
        var search = await Item.find({})
        res.status(200).json(search)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getItemOne = async (req, res) => {
    try {
        const { id } = req.params;
        const profileItem = await Item.findById(id);
        res.status(200).json({success: 'true', message: 'true', data: profileItem})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    createItem,
    deleteItem,
    getItemAll,
    getItemOne
}