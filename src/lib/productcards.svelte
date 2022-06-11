<script>
  import { cart } from "$lib/stores/cart.js";
import { get } from "svelte/store";
  export let title = "Missing Title";
  export let desc = "Missing Description";
  export let img = "https://api.lorem.space/image/shoes?w=400&h=225"
  export let price = 25
  let quantity = 1;
  let subQuantity = () => {
    if (quantity - 1 > 0) {
      quantity--;
    }
  }
  let addToCart = () => {
    let item = {
      title: title,
      price: price,
      quantity: quantity
    }
    quantity = 1;
    cart.set([...get(cart), item]);
  }
</script>

<div class="card w-96 bg-base-200 shadow-xl mx-auto mb-5">
  <figure><img src={img} alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title">{title}</h2>
    <p>{desc}</p>
    <p>ราคา : {price * quantity} ฿</p>
    <div class="card-actions justify-end">
      <div class="btn-group">
        <div class="btn" on:click={subQuantity}>-</div>
        <div class="btn no-animation" on:click={() => {quantity = 1}}>{quantity}</div>
        <div class="btn" on:click={() => {quantity++}}>+</div>
      </div>
      <div class="btn btn-primary" on:click={() => {addToCart()}}>add to cart</div>
    </div>
  </div>
</div>



