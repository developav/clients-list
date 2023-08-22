import Clients from "./clients.js";

export default function clientPost(){
    const form = document.getElementById('form');

form.addEventListener('submit', async function(e){
    e.preventDefault();

    const name = form.querySelector('[name="name"]'),
    surname = form.querySelector('[name="surname"]'),
    lastName = form.querySelector('[name="lastName"]'),
    type = form.querySelector('[name="type"]'),
    value = form.querySelector('[name="value"]');
    const tip = type.value.toString();
    const val = value.value.toString();
const data = {
      name: name.value,
      surname: surname.value,
      lastName: lastName.value,
  contacts : [
    {
        type:tip,
        value: val
  },
  ] 
}
console.log(data)
const response =  await fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify(data),
  })
  const result = await response.json();
  debugger
console.log(result)

});


let buttonAdd = document.querySelector('.clients__add-button');
let buttonClose = document.querySelector('.header__close')

buttonAdd.addEventListener('click', function(){
    document.querySelector('.header__pop-modal').classList.add('modal__open')
    
});
buttonClose.addEventListener('click', function(){
    document.querySelector('.header__pop-modal').classList.remove('modal__open')
});
}
clientPost();
