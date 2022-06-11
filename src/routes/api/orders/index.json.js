import ordersModel from '$lib/database/orders';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
	const products = await ordersModel.find();
  return {
    status: 200,
    body: {products}
  }
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({request}) {
	let req = await request.json();
  console.log(req);
	// let product = await ordersModel.create(req);
	return {
		status: 200,
		body: { 
			message: {req},
		}
	}
}
