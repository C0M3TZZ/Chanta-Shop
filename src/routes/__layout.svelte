<script>
  import "../app.css";
  import {cart} from "$lib/stores/cart.js";
  let cartItems = [];
  cart.subscribe(items => {
    cartItems = items;
  });
  let removeCartItem = (index) => {
    cart.set([...cartItems.slice(0, index), ...cartItems.slice(index + 1)]);
  };
  let initTotal = 0;
  let total = 0;
  $: total = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, initTotal);
</script>

<div class="flex-none">
  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <div class="navbar bg-primary">
        <label for="my-drawer" class="btn btn-square btn-ghost drawer-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
        <div class="flex-1">
          <a href="/" class="btn btn-ghost normal-case text-xl">Chanta Shop</a>
        </div>
        <div class="dropdown dropdown-hover dropdown-end mr-5">
          <div class="indicator">
            <span class="indicator-item badge badge-secondary">{cartItems.length}</span>
            <button class="btn rounded-btn no-animation">Cart</button>
          </div>
          <div class="dropdown-content shadow w-[32rem] h-96 bg-base-200 rounded-box overflow-hidden">
            <div class="h-3/4 overflow-x-auto">
              <table class="table w-full">
                <thead>
                  <tr>
                    <th class="px-4 py-2">Product</th>
                    <th class="px-4 py-2">Price</th>
                    <th class="px-4 py-2">Quantity</th>
                    <th class="px-4 py-2">Total</th>
                    <th class="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {#each cartItems as item, index}
                  <tr>
                    <td class="px-4 py-2">{item.title}</td>
                    <td class="px-4 py-2">{item.price} ฿</td>
                    <td class="px-4 py-2">{item.quantity}</td>
                    <td class="px-4 py-2">{item.price * item.quantity} ฿</td>
                    <td class="px-4 py-2"><div class="btn btn-sm" on:click={() => {removeCartItem(index)}}>Remove</div></td>
                  </tr>
                  {/each}
              </table>
            </div>
            <div class="card bg-primary h-1/4">
              <div class="card-body h-full">
                <div class="flex flex-row items-center justify-between w-full">
                  <h1>Total {total} ฿</h1>
                  <label for="deleteModal" class="btn">Buy</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <slot />
    </div> 
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
        <li><a href="/setting">Setting</a></li>
      </ul>
    </div>
  </div>
</div>

<input type="checkbox" id="deleteModal" class="modal-toggle " />
<label for="deleteModal" class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<label for="deleteModal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<h3 class="text-lg font-bold">Confirm</h3>
		<div class="modal-body">
			<p class="mt-2 pl-2">
				Do you want to Delete <span class="text-error font-bold">lol</span> ?
			</p>
			<div class="modal-action">
				<label for="deleteModal" class="btn btn-success">NO</label>
				<label
					for="deleteModal"
					class="btn btn-error"
					on:click={() => {
						
					}}>YES</label
				>
			</div>
		</div>
	</label>
</label>

