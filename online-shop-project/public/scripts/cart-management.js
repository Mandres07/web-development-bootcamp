const addToCartButtonElement = document.querySelector('#product-details button');
const cartBadgeElement = document.querySelector('.nav-items .badge');

async function addToCart() {
   const productId = addToCartButtonElement.dataset.productid;
   const csrfToken = addToCartButtonElement.dataset.csrf;
   let response;
   try {
      response = await fetch('/cart/items', {
         method: 'POST',
         body: JSON.stringify({
            productId: productId,
            _csrf: csrfToken
         }),
         headers: {
            'Content-Type': 'application/json'
         }
      });
   } catch (error) {
      return alert('Something went wrong!');
   }
   if (!response.ok) {
      return alert('Something went wrong!');
   }
   const responseData = await response.json();
   const newTotalQuantity = responseData.newTotalItems;
   cartBadgeElement.textContent = newTotalQuantity;
}

addToCartButtonElement.addEventListener('click', addToCart);
