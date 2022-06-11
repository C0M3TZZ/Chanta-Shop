import mongoose from "mongoose";
const schema = mongoose.Schema;

const orderSchema = new schema({
  orders: Array,
  createAt: Date,
});

const ordersModel = mongoose.model("orders", orderSchema);
export default ordersModel;
