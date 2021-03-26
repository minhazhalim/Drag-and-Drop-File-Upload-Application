document.querySelectorAll('.drop-zone__input').forEach((inputElement) => {
     const dropZoneElement = inputElement.closest('.drop-zone');
     dropZoneElement.addEventListener('click',(event) => {
          inputElement.click();
     });
     inputElement.addEventListener('change',(event) => {
          if(inputElement.files.length){
               updateThumbnail(dropZoneElement,inputElement.files[0]);
          }
     });
     dropZoneElement.addEventListener('dragover',(event) => {
          event.preventDefault();
          dropZoneElement.classList.add('drop-zone--over');
     });
     ['dragleave','dragend'].forEach((type) => {
          dropZoneElement.addEventListener(type,(event) => {
               dropZoneElement.classList.remove('drop-zone--over');
          });
     });
     dropZoneElement.addEventListener('drop',(event) => {
          event.preventDefault();
          if(event.dataTransfer.files.length){
               inputElement.files = event.dataTransfer.files;
               updateThumbnail(dropZoneElement,event.dataTransfer.files[0]);
          }
          dropZoneElement.classList.remove('drop-zone--over');
     });
});
function updateThumbnail(dropZoneElement,file){
     let thumbnailElement = dropZoneElement.querySelector('.drop-zone__thumb');
     if(dropZoneElement.querySelector('.drop-zone__prompt')){
          dropZoneElement.querySelector('.drop-zone__prompt').remove();
     }
     if(!thumbnailElement){
          thumbnailElement = document.createElement('div');
          thumbnailElement.classList.add('drop-zone__thumb');
          dropZoneElement.appendChild(thumbnailElement);
     }
     thumbnailElement.dataset.label = file.name;
     if(file.type.startsWith('image/')){
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.addEventListener('load',() => {
               thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
          });
     }else{
          thumbnailElement.style.backgroundImage = null;
     }
}