const HttpError = require('../models/http-errors');
const SkuModel = require('../models/SkuModel');

const getSkuById = async (req, res, next) => {
    const skuId = req.params.sid;
    if (!skuId.match(/^[0-9a-fA-F]{24}$/)) {
        return next(new HttpError('This is not a valid id'), 404);
    }
    const sku = await SkuModel.findById(skuId);
    if (sku === null) {
        console.log('le sku ne peut etre trouvé avec cet id', sku)
        return next(new HttpError('could not find a sku with this id'), 404);
    }
    res.json({ sku });
};
const addNewSku = async (req, res, next) => {
    let sku = new SkuModel(req.body);
    sku.save()
        .then(product => {
            res.status(200).json({ 'SKU': 'sku added successfully' });
        })
        .catch(err => {
            next(new HttpError('adding new sku failed'), 400);
        });
}
const updatedSku = async (req, res, next) => {
    SkuModel.findById(req.params.sid, function (err, sku) {
        console.log(sku)
        if (!sku)
            res.status(404).send("sku is not found");
        else
            sku.size = req.body.size;
        sku.quantity = req.body.quantity;
        sku.productId = req.body.productId;
        sku.save().then(sku => {
            res.json('sku updated!');
        })
            .catch(err => {
                next(new HttpError('updating sku failed'), 400);
            });
    });
}
const removeSkuByProductId = async (req, res) => {
    console.log(req.params.pid);

    SkuModel.deleteMany({ "productId": req.params.pid },
        function (err) {
            console.log("not remove", err)
        })
}

exports.getSkuById = getSkuById;
exports.addNewSku = addNewSku;
exports.updatedSku = updatedSku;
exports.removeSkuByProductId = removeSkuByProductId;