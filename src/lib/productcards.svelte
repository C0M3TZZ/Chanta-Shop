<script>
  export let title = "Missing Title";
  export let desc = "Missing Description";
  export let img = "https://api.lorem.space/image/shoes?w=400&h=225"
  export let price = 25
  let amount = 1;
  let subAmount = () => {
    if (amount - 1 > 0) {
      amount--;
    }
  }
</script>

<div class="card w-96 bg-base-200 shadow-xl mx-auto mb-5">
  <figure><img src={img} alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title">{title}</h2>
    <p>{desc}</p>
    <p>ราคา : {price * amount} ฿</p>
    <div class="card-actions justify-end">
      <div class="btn-group">
        <div class="btn" on:click={subAmount}>-</div>
        <div class="btn no-animation" on:click={() => {amount = 1}}>{amount}</div>
        <div class="btn" on:click={() => {amount++}}>+</div>
      </div>
      <div class="btn btn-primary">add to cart</div>
    </div>
  </div>
</div>



