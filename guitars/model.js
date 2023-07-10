const mongoose = require("mongoose");

const productSchema = mongoose.Schema({

    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    priceRange: { type: String, required: true },
    picOne: { type: String },
    picTwo: { type: String }

}, {
    timestamps: true,
});
// productSchema.index({ name: 'text', type: 'text', brand: 'text' });

productSchema.set("toJSON", {
    transform(doc, ret) {
        ret.id = ret._id
        delete ret.__v;
        delete ret.password;
        delete ret._id
    }
});


const Guitar = mongoose.model("Guitar", productSchema);

module.exports = Guitar;