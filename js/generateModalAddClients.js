import  {premissionContact}  from "./addClients.js";
export default function addSelectContact(labelContact){
    const addSelect = document.createElement('select'),
          inputContact = document.createElement('input'),
          optionTel = document.createElement('option'),
          optionTelWork = document.createElement('option'),
          optionEmail = document.createElement('option'),
          optionVk = document.createElement('option'),
          optionFacebook = document.createElement('option'),
          contactGroup = document.createElement('div'),
          buttonDelContact = document.createElement('button');
    buttonDelContact.className = 'deleteContacts__button';
    buttonDelContact.setAttribute('data-tooltip','Удалить контакт')
    inputContact.className = 'form__input form-control form__contact contact__input form__contact-input';
    inputContact.setAttribute('name', 'value');
    inputContact.setAttribute('value', '')
    inputContact.setAttribute('autocomplete', 'off');
    inputContact.setAttribute('type', 'text');
    inputContact.setAttribute('placeholder', 'Введите данные контакта');
    inputContact.setAttribute('id', 'contactInputAdd');
    inputContact.appendChild(buttonDelContact);
    contactGroup.className = 'contacts__group';
    addSelect.setAttribute('name', 'type');
    addSelect.className = 'select';
    labelContact.classList.add('open__add-modal');
    labelContact.appendChild(contactGroup)
    contactGroup.appendChild(addSelect);
    contactGroup.appendChild(inputContact);
    contactGroup.appendChild(buttonDelContact);
    optionTel.value = 'Телефон';
    optionTel.textContent = 'Телефон';
    optionTel.classList.add('contact__name')
    optionTelWork.value = 'Доп телефон';
    optionTelWork.textContent = 'Доп телефон';
    optionTelWork.classList.add('contact__name')
    optionEmail.value = 'Email';
    optionEmail.textContent = 'Email';
    optionEmail.classList.add('contact__name')
    optionVk.value = 'VK';
    optionVk.textContent = 'VK';
    optionVk.classList.add('contact__name')
    optionFacebook.value = 'Facebook';
    optionFacebook.textContent = 'Facebook';
    optionFacebook.classList.add('contact__name')
    addSelect.appendChild(optionTel);
    addSelect.appendChild(optionTelWork);
    addSelect.appendChild(optionEmail);
    addSelect.appendChild(optionVk);
    addSelect.appendChild(optionFacebook);
    
    const deleteAnimate = [
        {transform: "translateX(0%)"},
        {transform: "translateX(-150%)"}
     ];
     const deleteAnimateTiming = {
         duration: 400,
         iterations: 1,
     };

    buttonDelContact.addEventListener('click', function(){
        contactGroup.animate(deleteAnimate,deleteAnimateTiming)
        setTimeout(()=>{
            labelContact.removeChild(contactGroup);
            inputContact.parentNode.removeChild(inputContact);
            addSelect.parentNode.removeChild(addSelect)
            buttonDelContact.parentNode.removeChild(buttonDelContact)
        },300)
       
        premissionContact()
    })
}   









