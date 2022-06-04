export async function get() {
	let products = [
		{
			title: 'Shoes',
			desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			img: 'https://api.lorem.space/image/shoes?w=400&h=225',
			price: 25
		},
		{
			title: 'Shoes',
			desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			img: 'https://api.lorem.space/image/shoes?w=400&h=225',
			price: 50
		},
	];

  return {
    status: 200,
    body: {products}
  }
}
export async function post() {
	return {
		status: 200,
		body: {
			message: 'Product created'
		}
	}
}
