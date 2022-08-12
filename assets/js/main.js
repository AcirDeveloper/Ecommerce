import { darkMode } from './components/darkMode.js'
import { cart } from './components/cart.js'
import { scroll } from './components/scroll.js'

window.addEventListener('load', () => {
	load()
})

document.addEventListener('DOMContentLoaded', () => {
	darkMode()
	cart()
	scroll()
})

/* =========== LOADER ========== */
const loader = document.getElementById('loader')
function load() {
	setTimeout(() => {
		loader.classList.add('hide')
	}, 1000)
}
