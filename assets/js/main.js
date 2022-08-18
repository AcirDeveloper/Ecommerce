import { activeProduct } from './components/activar.js'
import { rendercart } from './components/cart.js'
import { cartMenu } from './components/menuCart.js'
import { darkTheme } from './components/darkMode.js'
import { cabeceraScroll } from './components/scroll.js'
import { load } from './components/load.js'
import { navigateMenu } from './components/navegacion.js'
import { renderproductos } from './components/productos.js'
import { sectionActive } from './components/seccionActiva.js'

window.addEventListener('load', function () {
	load()
})

document.addEventListener('DOMContentLoaded', function () {
	darkTheme()
	cabeceraScroll()
	navigateMenu()
	rendercart()
	activeProduct()
	cartMenu()
	renderproductos()
	sectionActive()
})
