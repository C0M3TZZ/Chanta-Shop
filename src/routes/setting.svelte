<script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/api/products.json');
		const { products } = await res.json();

		if (res.ok) {
			return {
				props: {
					listproducts : products,
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
	export let listproducts;
  let edit = false;
  let title = "";
  $: title = edit ? `Edit Product - ${modalForm.title}` : "Add Product";
  let modalForm = {
    title: '',
    desc: '',
    img: '',
    price: 0,
    type: '',
  };
  let selectProduct = {};
  let selectItem = (item) => {
    selectProduct = item;
  };
  let loadItem = (item) => {
    modalForm.title = item.title;
    modalForm.desc = item.desc;
    modalForm.img = item.img;
    modalForm.price = item.price;
    modalForm.type = item.type;
    edit = true;
    modal = true;
  };
  let validateForm = () => {
    if (modalForm.title.trim().length < 1) {
      alert('Title is required');
      return false;
    }
    if (modalForm.desc.trim().length < 1) {
      alert('Description is required');
      return false;
    }
    if (new RegExp('^(http|https)://').test(modalForm.img) === false || modalForm.img.trim().length < 1) {
      alert('Image is required or invalid url');
      return false;
    }
    if (isNaN(modalForm.price)) {
      alert('Price is Not a number');
      return false;
    }
  }
  let cleanItem = () => {
    modalForm.title = '';
    modalForm.desc = '';
    modalForm.img = '';
    modalForm.price = 0;
    modalForm.type = 'vegatable';
    edit = false;
  };

  let reload = async () => {
    const res = await fetch('/api/products.json');
    const { products } = await res.json();

    if (res.ok) {
      listproducts = products;
    }
  };
  let modal = false;
  let saveItem = async () => {
    if (validateForm()) { 
      return;
     }    
      if (!edit) {
        const newProduct = await fetch('/api/products.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(modalForm)
        });
        if (newProduct) {
          modal = false;
          await reload();
        }
      }
  }
  let delItem = async (item) => {
    const delProduct = await fetch(`/api/products/${item._id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (delProduct) {
      await reload();
    }
  }
	let password = 'root';
	let form = {
		password: null
	};
	let login = false;
	let loginForm = () => {
		if (form.password == password) {
			login = true;
		}
	};
</script>

<div class="container flex justify-center items-center mx-auto h-full">
	{#if !login}
		<div class="card w-96 bg-base-200">
			<div class="card-body">
				<h2 class="card-title">Login</h2>
				<input
					type="password"
					placeholder="Password"
					bind:value={form.password}
					class="input input-bordered input-primary w-full max-w-xs"
				/>
				<div class="card-actions justify-end">
					<button
						class="btn btn-primary"
						on:click={() => {
							loginForm();
						}}>Login</button
					>
				</div>
			</div>
		</div>
	{:else}
		<div class="overflow-x-auto outline-2 outline h-1/2 outline-primary">
			<table class="table w-full table-zebra">
				<thead class="sticky top-0">
					<tr>
						<th class="flex items-center justify-center "><label class="btn btn-sm modal-button" for="editModal" on:click={() => {cleanItem()}}>+</label></th>
						<th class="text-center">Title</th>
						<th class="text-center">Description</th>
						<th class="text-center">Price</th>
						<th class="text-center">Type</th>
						<th class="text-center">Action</th>
					</tr>
				</thead>
				<tbody>
					{#each listproducts as product, index}
						<tr>
							<td class="text-center">{index + 1}</td>
							<td class="text-center">{product.title}</td>
							<td class="text-center">{product.desc}</td>
							<td class="text-center">{product.price}</td>
							<td class="text-center">{product.type}</td>
							<td class="flex items-center justify-center">
								<label for="" on:click={() => { loadItem(product) }} class="btn btn-sm modal-button">EDIT</label>
								<label for="deleteModal" class="btn btn-sm modal-botton" on:click={() => {selectItem(product)}}>DEL</label>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<input type="checkbox" id="editModal" class="modal-toggle" bind:checked={modal} />
<label for="editModal" class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<label for="editModal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<h3 class="text-lg font-bold">{title}</h3>
		<div class="modal-body">
      <p class="mt-2 pl-2">Title</p>
      <input type="text" placeholder="Type here" bind:value={modalForm.title} class="input input-bordered w-full max-w mb-2" />
      <p class="mt-2 pl-2">Description</p>
      <input type="text" placeholder="Type here" bind:value={modalForm.desc} class="input input-bordered w-full max-w mb-2" />
      <p class="mt-2 pl-2">Price</p>
      <input type="text" placeholder="Type here" bind:value={modalForm.price} class="input input-bordered w-full max-w mb-2" />
      <p class="mt-2 pl-2">Type</p>
      <select class="select select-bordered w-full" bind:value={modalForm.type}>
        <option>vegatable</option>
        <option>fruit</option>
        <option>bakery</option>
        <option>spices</option>
      </select>
      <p class="mt-2 pl-2">Img URL</p>
      <input type="text" placeholder="Type here" bind:value={modalForm.img} class="input input-bordered w-full max-w mb-2" />
		</div>
		<div class="modal-action">
			<button class="btn" on:click={() => {saveItem()}}>Save</button>
		</div>
	</label>
</label>

<input type="checkbox" id="deleteModal" class="modal-toggle " />
<label for="deleteModal" class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<label for="deleteModal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<h3 class="text-lg font-bold">Confirm</h3>
		<div class="modal-body">
      <p class="mt-2 pl-2">Do you want to Delete <span class="text-error font-bold">{selectProduct.title}</span> ?</p>
		<div class="modal-action">
			<label for="deleteModal" class="btn btn-success">NO</label>
			<label for="deleteModal" class="btn btn-error" on:click={() => {delItem(selectProduct)}}>YES</label>
		</div>
	</label>
</label>
