export function cart() {
	/*=======  CARRITO =========== */
	const cartOpen = document.getElementById('cart-shop')
	const cartClose = document.getElementById('close-cart')
	const cartContainer = document.getElementById('cart-container')

	cartOpen.addEventListener('click', () => {
		cartContainer.classList.remove('hide')
	})

	cartClose.addEventListener('click', () => {
		cartContainer.classList.add('hide')
	})
}
