const fileInputEl = document.getElementById('image');
const imagePreviewEl = document.getElementById('image-preview');

function showPreview(event) {
   const files = fileInputEl.files;
   if (!files || files.length === 0) {
      imagePreviewEl.style.display = 'none';
      return;
   }
   const pickedFile = files[0];
   imagePreviewEl.src = URL.createObjectURL(pickedFile);
   imagePreviewEl.style.display = 'block';
}

fileInputEl.addEventListener('change', showPreview);