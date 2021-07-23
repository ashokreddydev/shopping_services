


const getProducts = async (req, res, next) => {
    try {
        var findObject = {};
        var sortObject = {};
        if (req.query.size) {
            findObject.size = { $all: req.query.size.split(',') }
        }
        if (req.query.sortPrice && Number(req.query.sortPrice)) {

            if (Number(req.query.sortPrice) == 1) {
                sortObject = {
                    price: 1
                }
            }
            else {
                sortObject = {
                    price: -1
                }
            }

        }
        const list = await products.find(findObject).sort(sortObject);
        responseHandler.success(req, res, list, 'successfully added')
    }
    catch (err) {
        responseHandler.error(req, res, err)
    }
}
const addProducts = async (req, res, next) => {
    try {
        const addProduct = await products.create(req.body);
        responseHandler.success(req, res, addProduct, 'successfully added')

    }
    catch (err) {
        responseHandler.error(req, res, err)
    }
}
const addCart = async (req, res, next) => {
    try {
        if (req.params.productID !== '0') {
            const cartData = await cart.findOne({ productID: req.params.productID });
            if (cartData) {
                await cart.updateOne({ productID: req.params.productID }, { $set: { qty: Number(cartData.qty) + 1 } });
            }
            else {
                await cart.create({ productID: req.params.productID, qty: 1 });                
            }
        }
        const allCart = await cart.find({});
        const ids = allCart.map(c => c.productID)
        const list = await products.find({ _id: { $in: ids } });
        var resp = [];
        list.forEach(element => {
            const item = allCart.find(x => x.productID.toString() === element._id.toString())
            resp.push({
                ...element._doc || element,
                qty: item.qty
            })
        });

        // const allCart = await cart.aggregate([
        //     { $lookup : {
        //         from: "products",           
        //         localField: "productID",
        //         foreignField:  "_id",     
        //         as: "data"   	  
        //     } }
        // ])
        responseHandler.success(req, res, resp, 'successfully added cart')

    }
    catch (err) {
        responseHandler.error(req, res, err)
    }
}
const deleteCart = async (req, res, next) => {
    try {
        const cartData = await cart.deleteOne({ productID: req.params.productID });
        req.params.productID = '0';
        next()
    }
    catch (err) {
        responseHandler.error(req, res, err)
    }
}

module.exports = {
    getProducts,
    addProducts,
    addCart,
    deleteCart
}