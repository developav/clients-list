import {addContact} from "./contact.js";
import  { deleteClient }  from "./method.js";
import { createContactTypeSelect } from "./contact.js";
import { FTP_SERVER } from './method.js'

const modal = document.querySelector('.header__change-modal');
const buttonClose = document.querySelector('.header__close-change');
const chancelClose = document.querySelector('.chancel__close');
const buttonAddChangeContact = document.getElementById('btn__add_client_change');

export const changeClient = () => {
    const clientsList = document.querySelector('.clients__list');
    clientsList.addEventListener('click', async (event) => {
      const changeBtn = event.target.closest('button[data-action="change"]');
      if (changeBtn) {
        changeBtn.classList.add('load')
        setTimeout(()=>{
            const clientId = changeBtn.dataset.id; // Получаем значение атрибута data-id клиента
            changeBtn.classList.remove('load')
            openChangeModal(clientId)
        },1000)
        
      }
    });
  }

  // Функция для открытия и заполнения модального окна данными клиента
      export  const openChangeModal = async (clientId) => {
          modal.classList.add('open');
          // Close modal event listeners
          clientsModalChangeGet(clientId)
          const closeModal = () => modal.classList.remove('open');
          buttonClose.addEventListener('click', closeModal);
          chancelClose.addEventListener('click', closeModal);
      
          
          // Fetch client data
};
export async function clientsModalChangeGet(clientId) {
    const response = await fetch(`${FTP_SERVER} + ${clientId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();
        const{ id, surname, name, lastName, contacts } = result;
        const surnameField = document.getElementById('surnameChange');
        const nameField = document.getElementById('nameChange');
        const lastNameField = document.getElementById('lastNameChange');
        const idField = document.getElementById('modal__id_clients');

        buttonAddChangeContact.addEventListener('click', (e) => {
            e.preventDefault();
            addContact()  
        });
        const contactsContainer = document.querySelector('.contacts__container');
        contactsContainer.innerHTML = '';

        contacts.forEach((contact, index) => {
            const contactDiv = document.createElement('div');
            contactDiv.classList.add('contacts__group');
            const buttonDelContact = document.createElement('button');
            buttonDelContact.className = 'deleteContacts__button';
            const contactTypeSelect = createContactTypeSelect(contact.type, index);
            contactDiv.innerHTML = `
                <input type="text" class="form__input form-control form__contact contact__input form__contact-input" id="contactValue${index}" value="${contact.value}">
            `;
            contactDiv.insertBefore(contactTypeSelect, contactDiv.firstChild);
            contactsContainer.appendChild(contactDiv);
            contactDiv.appendChild(buttonDelContact);

           

            buttonDelContact.addEventListener('click', function(){
                contactsContainer.removeChild(contactDiv);
            })
        });
        
       
        //Преобразование id к сокращенному виду для удобства чтения
        const shortId = id.split('');
        const shortIdSlice = shortId.slice(6,13);
        const shortIdJoin = shortIdSlice.join('');


        surnameField.value = surname;
        nameField.value = name;
        lastNameField.value = lastName;
        idField.textContent= `ID: ${shortIdJoin}`;
        const buttonModalDelete = document.querySelector('.btn__delete-change-modal');
        if(buttonModalDelete) {
            buttonModalDelete.addEventListener('click', async (e) => {
                e.preventDefault();
                await deleteClient(id)
            }) 
        } else{
            console.log(`Клиента с таким ${id} не существует`)
        }

        const saveButton = document.getElementById('btn__change');
        saveButton.addEventListener('click', (e) => {
            e.preventDefault();
    
            // Prepare data for PATCH request
            const updatedUser = {
                name: document.getElementById('nameChange').value,
                surname: document.getElementById('surnameChange').value,
                lastName: document.getElementById('lastNameChange').value,
                contacts: [],
            };
           

         
         for (let i = 0; i < contactsContainer.children.length; i++) {
             const contactDiv = contactsContainer.children[i];
             const updatedContact = {
                 type: contactDiv.querySelector(`#contactType${i}`).value,
                 value: contactDiv.querySelector(`#contactValue${i}`).value 
             };
             updatedUser.contacts.push(updatedContact);
         }
  
                fetch(`${FTP_SERVER} + ${clientId}`, {
                    method: 'PATCH',
                    headers: {
                         'Content-Type': 'application/json' 
                        },
                    body: JSON.stringify(updatedUser),
                })
                .then(response => {
                    if (!response.ok) {
                       throw new Error(`HTTP error! Status: ${response.status}`)   
                    }
                    return response.json();
                });
            });
       
    }  
    const validate = new window.JustValidate('#formChange',{
        validateBeforeSubmitting: true,
      })
      validate.addField('#surnameChange',[
        {
          rule: 'customRegexp',
          value: /[a-z]/gi,   
          errorMessage: 'Фамилия не состоит из цифр',
        },
        {
          rule: 'required',
          errorMessage: 'Поле не может быть пустым',
        } 
      ])
      .addField('#nameChange',[
        {
          rule: 'customRegexp',
          value: /[a-z]/gi,   
          errorMessage: 'Фамилия не состоит из цифр',
        },
        {
          rule: 'required',
          errorMessage: 'Поле не может быть пустым',
        } 
      ]).onSuccess((event)=> {
        event.clientsModalChangeGet(clientId)
      })