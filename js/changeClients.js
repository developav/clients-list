const addBtn = document.getElementById('btn__add_client');
const label = document.querySelector('.label__contacts');
addBtn.addEventListener('click', function(){
    label.classList.add('open')
})