export function cabeceraScroll() {
	const cabecera = document.getElementById('cabecera')

	if (cabecera) {
		window.addEventListener('scroll', function () {
			if (window.scrollY >= 50) {
				cabecera.classList.add('scroll-cabecera')
			} else {
				cabecera.classList.remove('scroll-cabecera')
			}
		})
	}
}
