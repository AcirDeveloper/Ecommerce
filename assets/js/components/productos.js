import { items } from '../data/db.js'
import { cart, rendercart } from './cart.js'
import { numberToCurrency } from '../helpers/numberToCurrency.js'

export const db = {
	items: window.localStorage.getItem('productos')
		? JSON.parse(window.localStorage.getItem('productos'))
		: items,
	methods: {
		find: (id) => {
			return db.items.find((item) => item.id === id)
		},
		getAll: () => {
			return db.items
		},
		remove: (items) => {
			items.forEach((item) => {
				const product = db.methods.find(item.id)
				product.quantity = product.quantity - item.quantity
			})
		},
	},
}

export const renderproductos = () => {
	const productosContainer = document.querySelector('#productos .productos__content')
	const productos = db.methods.getAll()
	let html = ``

	productos.forEach((product) => {
		html += `<article class="productos__card ${product.category}">
      <div class="productos__shape">
        <img src="${product.image}" alt="${product.name}" class="productos__img">
      </div>

      <div class="productos__data">
        <h2 class="productos__price">${numberToCurrency(
					product.price
				)} <span class="productos__quantity">| Stock: ${product.quantity}</span></h2>
        <h3 class="productos__name">${product.name}</h3>

        <button class="button productos__button" data-id="${product.id}">
          <i class='bx bx-plus'></i>
        </button>
      </div>
      </article>`
	})

	productosContainer.innerHTML += html

	const productosButton = document.querySelectorAll('.productos__button')

	productosButton.forEach((button) => {
		button.addEventListener('click', () => {
			const id = parseInt(button.getAttribute('data-id'))
			const product = db.methods.find(id)

			if (product && product.quantity > 0) {
				cart.methods.add(id, 1)
				rendercart()
			} else {
				window.alert('Sorry, we are out of stock')
			}
		})
	})

	window.localStorage.setItem('productos', JSON.stringify(db.items))
}
