import mongoose from "mongoose";
const schema = mongoose.Schema;

const productSchema = new schema({
  title: String,
  desc: String,
  img: String,
  price: Number,
  type: String,
});

const productsModel = mongoose.model('products', productSchema);

export default productsModel;
