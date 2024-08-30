import addSelectContact from "./generateModalAddClients.js";
import { addClient } from "./method.js";
import { createContactTypeSelect } from "./contact.js";
import JustValidate from '../node_modules/just-validate/dist/just-validate.es.js'

export const createContactModalAdd = () => {
  const buttonAddContact = document.querySelector('.btn__add_contact');
  const labelContact = document.querySelector('.label__contacts');

  buttonAddContact.addEventListener('click', () => { 
      addSelectContact(labelContact);
      premissionContact(); // Проверяем количество контактов после добавления
  });

  const validator = new JustValidate('#form', {
      validateBeforeSubmitting: true,
  });

  validator.addField('#surname', [
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
  .addField('#name', [
      {
          rule: 'customRegexp',
          value: /[a-z]/gi,   
          errorMessage: 'Имя не состоит из цифр',
      },
      {
          rule: 'required',
          errorMessage: 'Поле не может быть пустым',
      }
  ])
  .addField('#lastName', [
      {
          rule: 'customRegexp',
          value: /[a-z]/gi,   
          errorMessage: 'Отчество не состоит из цифр',
      }
  ]);

  // Проверка контактов при загрузке модального окна
  premissionContact();
};

export const clientPost = () => {
  const form = document.getElementById('form');
  const buttonAdd = document.querySelector('.clients__add-button');
  const buttonClose = document.querySelector('.header__close');
  const chancelClose = document.querySelector('.chancel__close');

  form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]'),
            surname = form.querySelector('[name="surname"]'),
            lastName = form.querySelector('[name="lastName"]'),
            contactType = form.querySelectorAll('.select'),
            contactValue = form.querySelectorAll('.form__contact');

      let contacts = [];

      for (let i = 0; i < contactType.length; i++) {
          contacts.push({
              type: contactType[i].value,
              value: contactValue[i].value
          });
      }

      const data = {
          name: name.value,
          surname: surname.value,
          lastName: lastName.value,
          contacts: contacts
      };

      addClient(data);
      premissionContact(); // Проверяем количество контактов после добавления
  });

  buttonAdd.addEventListener('click', () => {
      document.querySelector('.header__pop-modal').classList.add('modal__open');
  });

  buttonClose.addEventListener('click', () => {
      document.querySelector('.header__pop-modal').classList.remove('modal__open');
  });

  chancelClose.addEventListener('click', () => {
      document.querySelector('.header__pop-modal').classList.remove('modal__open');
  });
};

export const premissionContact = () => {
  const contactGroupLine = document.querySelectorAll('.contacts__group');
  const buttonAddContact = document.querySelector('.btn__add_contact');

  if (contactGroupLine.length >= 10) {
      buttonAddContact.setAttribute('disabled', 'true');
      buttonAddContact.style.display = 'none'; // Скрываем кнопку
  } else {
      buttonAddContact.removeAttribute('disabled');
      buttonAddContact.style.display = ''; // Показываем кнопку, если меньше 10 контактов
  }
};

// Вызов функции при загрузке страницы или открытии модального окна
premissionContact();




