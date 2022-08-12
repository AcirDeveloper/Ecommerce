export function darkMode() {
	/* =========DARK MODE======== */
	const themeButton = document.getElementById('theme-button')
	const dark = 'dark-theme'
	const icono = 'bx-sun'
	const seleccionarTema = window.localStorage.getItem('seleccionar-tema')
	const seleccionarIcono = window.localStorage.getItem('seleccionar-icono')

	const obtenerTema = () => (document.body.classList.contains(dark) ? 'dark-theme' : 'light-theme')

	const obtenerIcono = () => (themeButton.classList.contains(icono) ? 'bx-sun' : 'bx-moon')

	if (seleccionarTema) {
		document.body.classList[seleccionarTema === 'dark-theme' ? 'add' : 'remove'](dark)
		themeButton.classList[seleccionarIcono === ' bx-moon' ? 'add' : 'remove'](icono)
	}

	themeButton.addEventListener('click', () => {
		document.body.classList.toggle(dark)
		themeButton.classList.toggle(icono)
		window.localStorage.setItem('seleccionar-tema', obtenerTema())
		window.localStorage.setItem('seleccionar-icono', obtenerIcono())
	})
}
