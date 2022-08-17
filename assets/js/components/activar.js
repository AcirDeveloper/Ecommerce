export function activeProduct() {
	const linksproductos = document.querySelectorAll('.productos__item')

	for (let i = 0; i < linksproductos.length; i++) {
		linksproductos[i].addEventListener('click', function () {
			for (let j = 0; j < linksproductos.length; j++) {
				linksproductos[j].classList.remove('active-product')
			}
			this.classList.add('active-product')
		})
	}
}
