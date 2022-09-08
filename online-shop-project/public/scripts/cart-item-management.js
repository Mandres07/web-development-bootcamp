const cartItemUpdateFormElements = document.querySelectorAll('.cart-item-management');

async function updateCartItem(event) {
   event.preventDefault();
   const form = event.target;
   const productId = form.dataset.productid;
   const csrfToken = form.dataset.csrf;
   const quantity = form.firstElementChild.value;
   let response;
   try {
      response = await fetch('/cart/items', {
         method: 'PATCH',
         body: JSON.stringify({
            productId,
            quantity,
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
   if (responseData.updatedCartData.updatedItemPrice === 0) {
      form.parentElement.parentElement.remove();
   } else {
      const cartItemTotalPriceElement = form.parentElement.querySelector('.cart-item-price');
      cartItemTotalPriceElement.textContent = responseData.updatedCartData.updatedItemPrice.toFixed(2);
   }

   const cartTotalPriceElement = document.getElementById('cart-total-price');
   cartTotalPriceElement.textContent = responseData.updatedCartData.newTotalPrice.toFixed(2);

   const cartBadges = document.querySelectorAll('.nav-items .badge');
   for (const badge of cartBadges) {
      badge.textContent = responseData.updatedCartData.newTotalQuantity;
   }
}

for (const forms of cartItemUpdateFormElements) {
   forms.addEventListener('submit', updateCartItem);
}