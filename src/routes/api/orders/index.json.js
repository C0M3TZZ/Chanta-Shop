import ordersModel from '$lib/database/orders';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
	const orders = await ordersModel.find();
  return {
    status: 200,
    body: {orders}
  }
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({request}) {
	let req = await request.json();
	let product = await ordersModel.create(req);
	return {
		status: 200,
		body: { 
			message: {req},
		}
	}
}
