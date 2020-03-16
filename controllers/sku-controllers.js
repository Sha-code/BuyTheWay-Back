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
const getSkuByProductId = async (req, res, next) => {
    const skus = await SkuModel.find({ "productId": Number(req.params.pid) })
    console.log(skus)
    if (skus === null) {
        return next(new HttpError('could not find skus with this productId'), 404);
    }
    res.json({ skus });
}
const addNewSku = async (req, res, next) => {
    let sku = new SkuModel(req);
    sku.save()
        .then(sku => {
            console.log("sku added successfully");
            // res.status(200).json({ 'SKU': 'sku added successfully' });
        })
        .catch(err => {
            next(new HttpError('adding new sku failed'), 400);
        });
}
const updatedSku = async (req, res, next) => {
    SkuModel.findById(req.params.sid, function (err, sku) {
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
const updatedSkuCart = async (req, res, next) => {
    console.log("je suis dans update sku cart")
    console.log(req.skuId)
    SkuModel.findOne({productId : req.skuId, size: req.size }, function (err, sku) {
        console.log("skufoumded",sku)
        if (!sku)
            res.status(404).send("sku is not found");
        else
            sku.size = req.size;
            sku.quantity = (sku.quantity - req.quantity);
            sku.productId = req.skuId;
            sku.save()
            .then(sku => {
                res.status(200).json('sku updated and cart created!');
            })
            .catch(err => {
                next(new HttpError('updating sku failed'), 400);
            });
    });
}
const updatedSkuCartAtDelete = async (req, res, next) => {
    console.log("je suis dans update sku cart")
    console.log(req.skuId)
    SkuModel.findOne({productId : req.skuId, size: req.size }, function (err, sku) {
        console.log("skufoumded",sku)
        if (!sku)
            res.status(404).send("sku is not found");
        else
            sku.size = req.size;
            sku.quantity = (sku.quantity + req.quantity);
            sku.productId = req.skuId;
            sku.save()
            .then(sku => {
                res.status(200).json('sku updated and cart remove!');
            })
            .catch(err => {
                next(new HttpError('updating sku failed'), 400);
            });
    });
}

const removeSkuByProductId = async (req, res, next) => {
    req = req.toString();
    SkuModel.deleteMany({ "productId": req },
        function (err, response) {
            if (!response)
                next(new HttpError('skus are not found'), 404);
            else
                res.status(200).send("skus and product are removed");
        })
        .catch(err => {
            next(new HttpError('remove all sku failed'), 400);
        });
}

exports.getSkuById = getSkuById;
exports.addNewSku = addNewSku;
exports.updatedSku = updatedSku;
exports.removeSkuByProductId = removeSkuByProductId;
exports.getSkuByProductId = getSkuByProductId;
exports.updatedSkuCart = updatedSkuCart;
exports.updatedSkuCartAtDelete = updatedSkuCartAtDelete;