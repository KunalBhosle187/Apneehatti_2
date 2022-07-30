const Store = require("../models/storeModel");
const asyncHandler = require("express-async-handler");

const getStores = asyncHandler(async (req, res) => {
    const stores = await Store.find({});
    // throw new Error("something is wrong")
    res.json(stores);
});


module.exports = { getStores };
