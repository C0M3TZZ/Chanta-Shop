import productsModel from "$lib/database/products";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function patch({request, params}) {
	let body = await request.json();
  let id = params.id;
  let product = await productsModel.findByIdAndUpdate(id, body);
  return {
    status: 200,
    body: {
      message: {product},
    }
  }
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function del({params}) {
  let id = params.id;
  let product = await productsModel.findByIdAndDelete(id);
  return {
    status: 200,
    body: {
      message: {product},
    }
  }
}

