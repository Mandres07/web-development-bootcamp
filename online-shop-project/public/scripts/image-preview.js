const imagePickerEl = document.querySelector('#image-upload-control input');
const imagePreviewEl = document.querySelector('#image-upload-control img');

function updateImagePreview(event){
   const files = imagePickerEl.files;
   if(!files || files.length === 0){
      imagePreviewEl.style.display = 'none';
      return;
   }
   const pickedFile = files[0];
   imagePreviewEl.src = URL.createObjectURL(pickedFile);
   imagePreviewEl.style.display = 'block';
}

imagePickerEl.addEventListener('change', updateImagePreview);