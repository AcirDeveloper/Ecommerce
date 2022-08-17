export function navigateMenu() {
	const navigateToggle = document.getElementById('navigate-toggle')
	const navigateMenu = document.getElementById('navigate-menu')
	const navigateClose = document.getElementById('navigate-close')
	const navigateLink = document.querySelectorAll('.navigate__link')

	if (navigateToggle) {
		navigateToggle.addEventListener('click', function () {
			navigateMenu.classList.toggle('show-menu')
		})
	}

	if (navigateClose) {
		navigateClose.addEventListener('click', function () {
			navigateMenu.classList.remove('show-menu')
		})
	}

	function linkAction() {
		const navigateMenu = document.getElementById('navigate-menu')
		navigateMenu.classList.remove('show-menu')
	}
	navigateLink.forEach((n) => n.addEventListener('click', linkAction))
}
