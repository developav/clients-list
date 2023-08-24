import Clients from "./clients.js";

export default function clientPost(){
    const form = document.getElementById('form');
    const addBtn = document.getElementById('btn__add_client');
    function appendSelect(){
        const label = document.querySelector('.label__contacts');
            const select = document.createElement('select');
            select.classList.add('select');
            select.setAttribute('name','type')
            const options = select.options
            let newOption1 = new Option('Телефон', 'phone');
            let newOption2 = new Option('Доп.телефон', 'phonework');
            let newOption3 = new Option('Email', 'email');
            let newOption4 = new Option('VK', 'social');
            let newOption5 = new Option('Facebook', 'socialF');
            const inputContact = document.createElement('input');
            inputContact.classList.add('form__input');
            inputContact.classList.add('form-control');
            inputContact.classList.add('form__contact');
            inputContact.setAttribute('name', 'value');
            inputContact.setAttribute('autocomplete', 'off');
            inputContact.setAttribute('type', 'text');
            inputContact.setAttribute('placeholder', 'Введите данные');
            label.append(select);
            select.append(newOption1);
            select.append(newOption2);
            select.append(newOption3);
            select.append(newOption4);
            select.append(newOption5);
            label.append(inputContact); 
    }
    addBtn.addEventListener('click', function(){
        appendSelect();
    })

form.addEventListener('submit', async function(e){
    e.preventDefault();
    const label = document.querySelector('.label__contacts');
    const name = form.querySelector('[name="name"]'),
    surname = form.querySelector('[name="surname"]'),
    lastName = form.querySelector('[name="lastName"]'),
    type = form.querySelector('[name="type"]'),
    value = form.querySelector('[name="value"]');
    const tip = type.value.toString();
    const val = value.value.toString();
    debugger
    console.log(tip)
    console.log(val)
    type.forEach(function() {
        data.contacts.push(type)
    });
    value.forEach(function() {
        data.contacts.push(value)
    });
    debugger
const data = {
      name: name.value,
      surname: surname.value,
      lastName: lastName.value,
  contacts : [
    {
        type: tip,
        value: val
  },
  ] 
}
debugger
console.log(data.contacts)
const response =  await fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify(data),
  })
  const result = await response.json();
  debugger
console.log(result)

});

debugger
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
