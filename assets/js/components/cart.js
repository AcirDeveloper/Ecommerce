import { db } from './productos.js'
import { numberToCurrency } from './moneda.js'

export const cart = {
	items: window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart')) : [],
	methods: {
		add: (id, quantity) => {
			const cartItem = cart.methods.get(id)

			if (cartItem) {
				if (cart.methods.hasInventory(id, quantity + cartItem.quantity)) {
					cartItem.quantity += quantity
				} else {
					window.alert('No hay mas de este producto')
				}
			} else {
				cart.items.push({ id, quantity })
			}
		},
		remove: (id, quantity) => {
			const cartItem = cart.methods.get(id)

			if (cartItem.quantity - quantity > 0) {
				cartItem.quantity -= quantity
			} else {
				cart.items = cart.items.filter((item) => item.id !== id)
			}
		},
		removeAll: (id) => {
			cart.items = cart.items.filter((item) => item.id !== id)
		},
		count: () => {
			return cart.items.reduce((acc, item) => acc + item.quantity, 0)
		},
		get: (id) => {
			const index = cart.items.findIndex((item) => item.id === id)
			return index >= 0 ? cart.items[index] : null
		},
		getAll: () => {
			return cart.items
		},
		getTotal: () => {
			const total = cart.items.reduce((acc, item) => {
				const itemDB = db.methods.find(item.id)
				return acc + itemDB.price * item.quantity
			}, 0)

			return total
		},
		hasInventory: (id, quantity) => {
			return db.methods.find(id).quantity - quantity >= 0
		},
		purchase: () => {
			db.methods.remove(cart.items)
			cart.items = []
		},
	},
}

export function rendercart() {
	const cartContainer = document.querySelector('#cart .cart__container')
	const cartItems = cart.methods.getAll()
	let html = ''

	if (cartItems.length > 0) {
		cartItems.forEach((item) => {
			const product = db.methods.find(item.id)
			html += `
        <article class="cart__card">
          <div class="cart__box">
            <img src="${product.image}" alt="${product.name}" class="cart__img">
          </div>
  
          <div class="cart__details">
            <h3 class="cart__title">${product.name}</h3>
            <span class="cart__stock">Stock: ${
							product.quantity
						} | <span class="cart__price">${numberToCurrency(product.price)}</span></span>
            <span class="cart__subtotal">
              Subtotal: ${numberToCurrency(item.quantity * product.price)}
            </span>
  
            <div class="cart__amount">
              <div class="cart__amount-content">
                <span class="cart__amount-box minus" data-id="${product.id}">
                <i class='bx bx-minus'></i>
                </span>
  
                <span class="cart__amount-number">${item.quantity} units</span>
  
                <span class="cart__amount-box plus" data-id="${product.id}">
                <i class='bx bx-plus'></i>
                </span>
              </div>
  
              <i class='bx bx-trash-alt cart__amount-trash' data-id="${product.id}"></i>
            </div>
          </div>
        </article>`
		})
	} else {
		html += `
      <div class="cart__empty">
        <img src="assets/images/empty-cart.png" alt="empty cart">
        <h2>El carrito esta vacio</h2>
        <p>Puedes añadir cosas al carrito dando clic al boton "<i class="bx bx-plus"></i>" de cada producto.</p>
      </div>`
	}

	cartContainer.innerHTML = html

	const cartCount = document.getElementById('cart-count')
	const itemsCount = document.getElementById('items-count')

	cartCount.innerHTML = cart.methods.count()
	itemsCount.innerHTML = cart.methods.count()

	const minusItems = document.querySelectorAll('.minus')
	const plusItems = document.querySelectorAll('.plus')
	const deleteButtons = document.querySelectorAll('.cart__amount-trash')
	const totalContainer = document.getElementById('cart-total')
	const checkoutButton = document.getElementById('cart-checkout')

	minusItems.forEach((item) => {
		item.addEventListener('click', () => {
			const id = parseInt(item.getAttribute('data-id'))
			cart.methods.remove(id, 1)
			rendercart()
		})
	})

	plusItems.forEach((item) => {
		item.addEventListener('click', () => {
			const id = parseInt(item.getAttribute('data-id'))
			cart.methods.add(id, 1)
			rendercart()
		})
	})

	deleteButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const id = parseInt(button.getAttribute('data-id'))
			cart.methods.removeAll(id)
			rendercart()
		})
	})

	const total = cart.methods.getTotal()
	totalContainer.innerHTML = numberToCurrency(total)

	if (cart.items.length > 0) {
		checkoutButton.removeAttribute('disabled')
	} else {
		checkoutButton.setAttribute('disabled', 'disabled')
	}

	checkoutButton.addEventListener('click', () => {
		cart.methods.purchase()
		rendercart()
	})

	window.localStorage.setItem('productos', JSON.stringify(db.items))
	window.localStorage.setItem('cart', JSON.stringify(cart.items))
}
