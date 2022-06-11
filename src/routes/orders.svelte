<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/api/orders.json');
		const { orders } = await res.json();
		orders.reverse();
		if (res.ok) {
			return {
				props: {
					getorders : orders
				}
			};
		}

		return {
			status: res.status,
			error: new Error(res.statusText)
		};
	}
</script>

<script>
  import { browser } from '$app/env';
  let reload = async () => {
    if (browser){
      const res = await fetch('/api/orders.json');
      const { orders } = await res.json();
      orders.reverse();
      if (res.ok) {
        getorders = orders;
      }
    }
	};
  setInterval(reload, 10000);
	export let getorders = [];
	let orderItems = [];
	let infoModal = false;
  let total = 0;
  import moment from 'moment';
  $: total = orderItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
</script>

<div class="container content-center mx-auto">
	<div class="flex flex-row flex-wrap my-5">
		{#each getorders as order, i}
			<div
				class="card btn w-96 h-auto shadow-xl mx-auto mb-5"
				on:click={() => {
					orderItems = order.orders;
          infoModal = true;
				}}
			>
				<div class="card-body text-center">
					<h5 class="card-title">Order #{getorders.length - i}</h5>
          <p>{moment(order.createAt).fromNow()}</p>
				</div>
			</div>
		{/each}
	</div>
</div>

<input type="checkbox" id="confirmModal" class="modal-toggle" bind:checked={infoModal} />
<label for="confirmModal" class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<label for="confirmModal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<h3 class="text-lg font-bold">Confirm</h3>
		<div class="modal-body">
      <div class="w-full h-60 rounded-box overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <td>#</td>
            <td>Title</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>Total</td>
          </thead>
          <tbody>
            {#each orderItems as item, i}
              <tr>
                <td>{i + 1}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.price * item.quantity}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
			<div class="modal-action">
				<p>Total : {total} ฿</p>
			</div>
		</div>
	</label>
</label>
