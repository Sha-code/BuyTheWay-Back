const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    items: [
        { }
    ],
    price: {
        type: Number,
    },
    created_at: {
        type: Date,
    },
    updated_at: {

       type: Date,
   }

});

/*

items contiendra le sku des produits ajouté par l'utilisateur au format 
items: [
        { sku: '00e8da9b', qty: 1,  },
        { sku: '0ab42f88', qty: 4,  }
    ]

created at et updated at permetront de donner une espérance de vie au panier. par ex si updated at à pas bouger depuis X heures , on supprimer le document 
à vérifier si le format "Date" contient bien les heures et les minutes

price est donc la somme du prix des items
*/
const Cart = mongoose.model("cart", CartSchema);
module.exports = Cart;
