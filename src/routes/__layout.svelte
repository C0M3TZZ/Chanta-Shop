<script>
  import "../app.css";
  import { page } from '$app/stores';
  let isindex = false;
  $: isindex = $page.url.pathname === '/' ? true : false;
  import {cart} from "$lib/stores/cart.js";
  let cartItems = [];
  cart.subscribe(items => {
    cartItems = items;
  });
  let removeCartItem = (index) => {
    cart.set([...cartItems.slice(0, index), ...cartItems.slice(index + 1)]);
  };
  let total = 0;
  let confirmOrder = false;
  let alertModal = false;
  let createOrders = async (cartItems) => {
    const order = {
      orders: cartItems,
      createAt: new Date(),
    }
    const orders = await fetch("/api/orders.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    });
    if (orders) {      
      confirmOrder = false;
      alertModal = true;
      cart.set([]);
    }
  }

  $: total = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
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
        {#if isindex}
          <div class="dropdown dropdown-hover dropdown-end mr-5">
            <div class="indicator">
              <span class="indicator-item badge badge-secondary">{cartItems.length}</span>
              <button class="btn rounded-btn no-animation">ตะกร้าสินค้า</button>
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
                      <td class="px-4 py-2"><div class="btn btn-sm" on:click={() => {removeCartItem(index)}}>เอาออก</div></td>
                    </tr>
                    {/each}
                </table>
              </div>
              <div class="card bg-primary h-1/4">
                <div class="card-body h-full">
                  <div class="flex flex-row items-center justify-between w-full">
                    <h1>ทั้งหมด {total} ฿</h1>
                    <div class="btn" on:click={() => {confirmOrder = true}}>ซื้อ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/if}
      </div>
      <slot />
    </div> 
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
        <li><a href="/setting">ตั้งค่า</a></li>
      </ul>
    </div>
  </div>
</div>

<input type="checkbox" id="confirmModal" class="modal-toggle" bind:checked={confirmOrder} />
<label for="confirmModal" class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<label for="confirmModal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<h3 class="text-lg font-bold">Confirm</h3>
		<div class="modal-body">
			<p class="mt-2 pl-2">
				คุณต้องการจะจ่ายเงินทั้งหมด <span class="text-primary font-bold">{total}</span> บาทหรือไม่?
			</p>
			<div class="modal-action">
				<label for="confirmModal" class="btn btn-error">ไม่</label>
				<div
					class="btn btn-success"
					on:click={() => {
						createOrders(cartItems);
					}}>ใช่</div>
			</div>
		</div>
	</label>
</label>

<input type="checkbox" id="alertModal" class="modal-toggle" bind:checked={alertModal}/>
<div class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">แจ้งเตือน</h3>
    <p class="py-4">Order ของคุณถูกจัดส่งให้ทางร้านแล้ว</p>
    <div class="modal-action">
      <label for="alertModal" class="btn">Ok!</label>
    </div>
  </div>
</div>
