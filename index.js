const product = [
    {
        id : 1,
        name : "SNEAKER-1",
        price : 200,
       image : "image-product-2.jpg",
       instock : 7
    },
    {
        id : 2,
        name : "SNEAKER-2",
        price : 400,
       image : "image-product-10.jpg",
       instock : 7
    },
    {
        id : 3,
        name : "SNEAKER-3",
        price : 600,
       image : "image-product-4.jpg",
       instock : 7
    },
    {
        id : 4,
        name : "SNEAKER-4",
        price : 800,
       image : "image-product-8.jpg",
       instock : 7
    },
    {
        id : 5,
        name : "SNEAKER-5",
        price : 1000,
       image : "image-product-6.jpg",
       instock : 7
    },
    {
        id : 6,
        name : "SNEAKER-6",
        price : 1200,
       image : "image-product-8.jpg",
       instock : 7
    },
    {
        id : 7,
        name : "SNEAKER-7",
        price : 1400,
       image : "image-product-3.jpg",
       instock : 7
    },
    {
        id : 8,
        name : "SNEAKER-8",
        price : 1600,
       image : "image-product-5.jpg",
       instock : 7
    },
    {
        id : 9,
        name : "SNEAKER-9",
        price : 1600,
       image : "image-product-11.jpg",
       instock : 7
    },
    {
        id : 10,
        name : "SNEAKER-10",
        price : 1600,
       image : "image-product-1.jpg",
       instock : 7
    },
]



const listProducts = document.querySelector('.listProduct');
const listCart = document.querySelector('.listCart');
const cartIcon = document.querySelector('.icon-cart');
const body = document.querySelector('body');
const close = document.querySelector('.close');
const span = document.querySelector('span');
const plus = document.querySelector('.plus');


 function fetchData() {
    const myProducts = product;
    addProductToList(myProducts);
}
fetchData()

function addProductToList(e) {
    listProducts.innerHTML = "";
    if (product.length > 0) {
        e.forEach(element => {
            const div = document.createElement('div')
            div.classList.add('items')
            div.id = element.id
            div.innerHTML = `
            <img src="${element.image}" alt="${element.name}">
            <h2 class="name">${element.name}</h2>
            <div class="price">#${element.price}</div>
            <button class="addCart">
                Add To Cart
            </button> `
            listProducts.appendChild(div)
        }
        );
    }
}


let parentEl = ''

function notify(e) {
    e.preventDefault()
    const myTarget = e.target;
    if (myTarget.classList.contains('addCart')) {
       parentEl = myTarget.parentElement.firstElementChild.nextElementSibling.innerText
      if (cart.some( exist => exist.id == e.target.parentElement.id)) {
       
       setTimeout(() => {
        alert(`You added ${parentEl} to the cart`)
       }, 500);
        
      } 

    } 
}



listProducts.addEventListener('click', (e)=> {
    e.preventDefault()
    const myTarget = e.target;
    if (myTarget.classList.contains('addCart')) {
      const parentEl = myTarget.parentElement.id
      addProductToCart(parentEl);
      
    }
})

let cart = [];

// if there is nothing in the local storage, the Cart will be an empty array but if there is something, it will be parsed into the Cart.
// let cart = JSON.parse(localStorage.getItem('CART') || []);
updateCart()

function addProductToCart(id) {
    const  items = product.find( (products) => products.id == id)
    if (cart.some(exist => exist.id == id)) {

        console.log('Item already exists');

        increaseValue('plus', id)

    } else {
        cart.push({
            ...items,
            numberOfUnits : 1

        })
    }

    
    updateCart()
}

function addProductToCartList() {
    listCart.innerHTML = '';
    if (cart.length > 0) {
        cart.forEach(cartt =>{
            const newCart = document.createElement('div');
            newCart.classList.add('item')
            // newCart.id = 'item'
            newCart.innerHTML = `
            <div class="image" onClick ='removeItemFromCart(${cartt.id})'><img src="${cartt.image}" alt=""></div>
            <div class="name">${cartt.name}</div>
            <div class="totalPrice">#${cartt.price * cartt.numberOfUnits}</div>
            <div class="quantity">
            <span class="minus" onClick = "increaseValue('minus', ${cartt.id})">-</span>
            <span>${cartt.numberOfUnits}</span>
            <span class="plus" onClick = "increaseValue('plus', ${cartt.id})">+</span>
            </div> 
            `
            listCart.appendChild(newCart);

        } )
    }
 
}

function updateCart() {
    addProductToCartList()
    totalCart()

    localStorage.setItem('CART', JSON.stringify(cart))
}

// a function to change quantity 
function increaseValue(action, id) {
    // map() will return a new array and hence the cart reassignment below.
    cart = cart.map( carts => {
        let numberOfUnits = carts.numberOfUnits

        if (carts.id == id) {
            if (action == 'minus' && numberOfUnits > 1) {
                numberOfUnits--;

            } else if (action == 'plus' && numberOfUnits < carts.instock) {

                numberOfUnits++;
            }
            }
            
        return {
            ...carts,
            numberOfUnits,
        }
    });
   
    updateCart()
}





function totalCart() {
    let totalCartEl = 0;

    cart.forEach(item => {
        totalCartEl += item.numberOfUnits;
    })


    span.innerHTML = totalCartEl;
    
}

// a function to remove item from cart

function removeItemFromCart(id) {
    cart = cart.filter(item => item.id != id)


// filter returns new array so whenever there's change to my cart array then i need to update the product list and hence the calling below.
 
    updateCart()
}







listProducts.addEventListener('click', notify)

cartIcon.addEventListener('click', ()=> {
    body.classList.toggle('showCart');
})


close.addEventListener('click', ()=> {
    body.classList.toggle('showCart');
})





























































































