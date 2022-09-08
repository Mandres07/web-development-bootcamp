const deleteProductButtons = document.querySelectorAll('.product-item button');

async function deleteProduct(event) {
   const buttonElement = event.target;
   const productid = buttonElement.dataset.productid;
   const csrfToken = buttonElement.dataset.csrf;
   const response = await fetch(`/admin/products/${productid}?_csrf=${csrfToken}`, {
      method: 'DELETE'
   });
   if (!response.ok) {
      return alert('Something went wrong!');
   }
   buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const deleteButton of deleteProductButtons) {
   deleteButton.addEventListener('click', deleteProduct);
}
