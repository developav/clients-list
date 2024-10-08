import { getDate } from "./tranformData.js";
import { getHours } from './tranformData.js';
import { typeText } from './contact.js';
import { deleteSearchClients } from "./deleteClients.js";
import { changeClient } from "./changeClient.js";
import { fetchData } from "./method.js";
import { generateHeadTable } from './tranformData.js';

let sortDirection = 'asc'; // 'asc' для возрастания, 'desc' для убывания
let sortField = 'id'; // 'id' для сортировки по id, 'name' для сортировки по имени

export async function generateTable(fetchDataFunction) {
  const tableBody = document.querySelector('.clients__list');
  tableBody.innerHTML = ''; // Очищаем таблицу перед заполнением
  const clients = await fetchDataFunction;
  if (clients.length === 0) {
    return;
  }
  // Сортировка клиентов по id
  const sortedClients = sortByField(clients, sortField, sortDirection);

  sortedClients.forEach(client => {
    const { id, surname, name, lastName, createdAt, updatedAt, contacts } = client;
    const fullName = `${surname} ${name} ${lastName}`; // исправлено форматирование строки
    const createDateTime = getDate(createdAt);
    const createTime = getHours(createdAt);
    const updateDateTime = getDate(updatedAt);
    const updateTime = getHours(updatedAt);

    const shortId = id.split('');
    const shortIdSlice = shortId.slice(8, 13);
    const shortIdJoin = shortIdSlice.join('');

    const limitedContacts = contacts.slice(0, 4);
    const extraContacts = contacts.slice(4);

    const contactHTML = limitedContacts.map(contact => {
      return `<li class="contacts__list">${typeText(contact.type, contact.value)}</li>`;
    }).join('');

    const extraContactsHTML = extraContacts.map(contact => {
      return `<li class="contacts__list">${typeText(contact.type, contact.value)}</li>`;
    }).join('');

    const row = document.createElement('tr');
    row.className = 'clients__row-id';
    row.dataset.clientId = id; // Добавляем id клиента как data-атрибут строки
    row.innerHTML = `
      <td class="clients__id" data-rowid="${id}" id="clientid">${shortIdJoin}</td>
      <td colspan="1">${fullName}</td>
      <td>
        <div class="date__time">
          <span class="create__date">${createDateTime}</span>
          <span class="create__time time">${createTime}</span>
        </div>
      </td>
      <td>
        <div class="date__time">
          <span class="create__date">${updateDateTime}</span>
          <span class="create__time time">${updateTime}</span>
        </div>
      </td>
      <td style="max-width: 130px;">
        <ul class="client__row-list">
          ${contactHTML}
         
          <ul class="extra-contacts hidden__contact">${extraContactsHTML}
          </ul>
           ${extraContacts.length > 0 ? `<a data-tooltip="Больше.." class="show-more-btn"> +${extraContacts.length}</a>` : ''}
        </ul>
      </td>
      <td>
        <div class="button__group">
          <button class="change__btn" data-id="${id}" data-action="change">Изменить</button>
          <button class="delete__btn" data-id="${id}" data-action="delete">Удалить</button>
        </div>
      </td>`;
      const deleteAnimate = [
        {opacity: "0"},
        {opacity: "1"}
     ];
     const deleteAnimateTiming = {
         duration: 800,
         iterations: 1,
     };
    tableBody.appendChild(row).animate(deleteAnimate,deleteAnimateTiming);
  });

  // Добавляем делегирование событий для кнопок "Показать еще"
  // tableBody.addEventListener('click', event => {
  //   if (event.target.classList.contains('show-more-btn')) {
  //     const button = event.target;
  //     const clientRow = button.closest('.clients__row-id');
  //     const extraContactsUl = clientRow.querySelector('.extra-contacts');
  //     extraContactsUl.classList.toggle('hidden__contact');
  //     button.classList.toggle('close__contact')
  //     button.textContent = extraContactsUl.classList.contains('hidden__contact') ? ` +${extraContactsUl.childElementCount}` : '';
  //   }
  // });

  // Удаление клиента
  deleteSearchClients();
  changeClient();
}

function sortByField(clients, field, direction) {
  return clients.sort((a, b) => {
    if (field === 'id') {
      return direction === 'asc' ? a.id - b.id : b.id - a.id;
    } else if (field === 'name') {
      const nameA = `${a.surname} ${a.name} ${a.lastName}`.toLowerCase();
      const nameB = `${b.surname} ${b.name} ${b.lastName}`.toLowerCase();

if (nameA < nameB) return direction === 'asc' ? -1 : 1;
      if (nameA > nameB) return direction === 'asc' ? 1 : -1;
      return 0;
    } else if (field === 'createdAt') {
      return direction === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);
    } else if (field === 'updatedAt') {
      return direction === 'asc' ? new Date(a.updatedAt) - new Date(b.updatedAt) : new Date(b.updatedAt) - new Date(a.updatedAt);
    }
  });
}
addEventListener('DOMContentLoaded', ()=> {
  const sortButton = document.querySelector('.btn-sort__id'); // предполагаем, что у кнопки есть id="sortButton"
  sortButton.addEventListener('click', () => {
    // Меняем направление сортировки при каждом нажатии
    const sortIdSvg = document.querySelector('.btn-sort__id-arrow');
    sortIdSvg.classList.toggle('toggle')
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    sortField = 'id'; // Устанавливаем поле для сортировки по id
    // Перегенерируем таблицу с новым направлением сортировки
      generateTable(fetchData());
  });
  const sortByNameButton = document.querySelector('.btn-sort__fio'); // предполагаем, что у кнопки есть id="sortByNameButton"
  sortByNameButton.addEventListener('click', () => {
    // Меняем направление сортировки при каждом нажатии
    const sortFioSvg = document.querySelector('.btn-sort__fio-arrow');
    sortFioSvg.classList.toggle('toggle')
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    sortField = 'name'; // Устанавливаем поле для сортировки по имени
    // Перегенерируем таблицу с новым направлением сортировки
    generateTable(fetchData());
  });
  const sortByDateButton = document.querySelector('.btn-sort__create'); // предполагаем, что у кнопки есть id="sortByNameButton"
  sortByDateButton.addEventListener('click', () => {
    // Меняем направление сортировки при каждом нажатии
    const sortCreateSvg = document.querySelector('.btn-sort__create-arrow');
    sortCreateSvg.classList.toggle('toggle')
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    sortField = 'createdAt'; // Устанавливаем поле для сортировки по дате создания
    // Перегенерируем таблицу с новым направлением сортировки
    generateTable(fetchData());
  });
  const sortByUpDateButton = document.querySelector('.btn-sort__last'); // предполагаем, что у кнопки есть id="sortByNameButton"
  sortByUpDateButton.addEventListener('click', () => {
    // Меняем направление сортировки при каждом нажатии
    const sortCreateSvg = document.querySelector('.btn-sort__last-arrow');
    sortCreateSvg.classList.toggle('toggle')
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    sortField = 'updatedAt'; // Устанавливаем поле для сортировки по дате изменения
    // Перегенерируем таблицу с новым направлением сортировки
    generateTable(fetchData());
  });
});