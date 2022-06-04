import productsModel from "$lib/database/products";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
	const products = await productsModel.find();
  return {
    status: 200,
    body: {products}
  }
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({request}) {
	let req = await request.json();
	let product = await productsModel.create(req);
	return {
		status: 200,
		body: { 
			message: {product},
		}
	}
}
