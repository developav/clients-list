// import { getDate } from "./tranformData.js";
// import { getHours } from './tranformData.js';
// import { typeText } from './contact.js';
// import { deleteSearchClients } from "./deleteClients.js";
// import { changeClient } from "./changeClient.js";
// import { filterClientsaByName } from './tranformData.js';
// import { fetchData } from "./method.js";
// import { generateHeadTable } from './tranformData.js'

// export async function generateTable(fetchDataFunction) {
//     const tableBody = document.querySelector('.clients__list');
//     tableBody.innerHTML = ''; // Очищаем таблицу перед заполнением
//     const clients = await fetchDataFunction;
//     if(clients.lenght === 0){
//         console.log('no data')
//         return;
//     }
//     clients.forEach(client => {
//       const { id, surname, name, lastName, createdAt, updatedAt, contacts } = client;
//       const fullName = `${surname}  ${name}  ${lastName}`;
//       const createDateTime = getDate(createdAt);
//       const createTime = getHours(createdAt);
//       const updateDateTime = getDate(updatedAt);
//       const updateTime = getHours(updatedAt);
// //Фильтр при вводе input
//       const inputFio = document.getElementById('inputFio');
//         inputFio.addEventListener('input', (event) => {
//         const query = event.target.value;
//         const filteredClients = filterClientsaByName(clients, query)
//         generateTable(filteredClients);
// })
  


//       const shortId = id.split('');
//       const shortIdSlice = shortId.slice(6,13);
//       const shortIdJoin = shortIdSlice.join('')
//       console.log(id)
    
    
//       const contactHTML = contacts.map(contact => {
//         return `<li class="contacts__list">${typeText(contact.type, contact.value)}</li>`;
//       }).join('');
  
  
//       const row = document.createElement('tr');
//       row.className = 'clients__row-id';
//       row.innerHTML = `
//          <td data-rowid="${id}" id="clientid">${shortIdJoin}</td>
//       <td colspan="1">${fullName}</td>
//       <td>
//         <div class="date__time">
//           <span class="create__date">${createDateTime}</span> 
//           <span class="create__time time">${createTime}</span>
//         </div>
//       </td>
//       <td>
//       <div  class="date__time">
//           <span class="create__date"> ${updateDateTime}</span> 
//           <span class="create__time time">${updateTime}</span>
//         </div>
//       </td>
//       <td><ul class="client__row-list">${contactHTML}</ul></td>
//       <td>
//       <div class="button__group">
//         <button class="change__btn" data-id="${id}" data-action="change">Изменить</button>
//         <button class="delete__btn" data-id="${id}" data-action="delete">Удалить</button>
//       </div>
        
//       </td>`;
  
//       tableBody.appendChild(row);
//     });
  
//     // Удаление клиента
//     deleteSearchClients();
//     changeClient();
//   }

  import { getDate } from "./tranformData.js";
import { getHours } from './tranformData.js';
import { typeText } from './contact.js';
import { deleteSearchClients } from "./deleteClients.js";
import { changeClient } from "./changeClient.js";
import { filterClientsaByName } from './tranformData.js';
import { fetchData } from "./method.js";
import { generateHeadTable } from './tranformData.js';

let sortDirection = 'asc'; // 'asc' для возрастания, 'desc' для убывания

export async function generateTable(fetchDataFunction) {
  const tableBody = document.querySelector('.clients__list');
  tableBody.innerHTML = ''; // Очищаем таблицу перед заполнением
  const clients = await fetchDataFunction;
  if (clients.length === 0) { // исправлено 'lenght' на 'length'
    console.log('no data');
    return;
  }

  // Сортировка клиентов по id
  const sortedClients = sortById(clients, sortDirection);

  clients.forEach(client => {
    const { id, surname, name, lastName, createdAt, updatedAt, contacts } = client;
    const fullName = `${surname} ${name} ${lastName}`; // исправлено форматирование строки
    const createDateTime = getDate(createdAt);
    const createTime = getHours(createdAt);
    const updateDateTime = getDate(updatedAt);
    const updateTime = getHours(updatedAt);

    // Фильтр при вводе input
    const inputFio = document.getElementById('inputFio');
    inputFio.addEventListener('input', (event) => {
      const query = event.target.value;
      const filteredClients = filterClientsaByName(clients, query);
      generateTable(() => Promise.resolve(filteredClients)); // исправлено вызов функции
    });

    const shortId = id.split('');
    const shortIdSlice = shortId.slice(6, 13);
    const shortIdJoin = shortIdSlice.join('');
    console.log(id);

    const contactHTML = contacts.map(contact => {
      return `<li class="contacts__list">${typeText(contact.type, contact.value)}</li>`;
    }).join('');

    const row = document.createElement('tr');
    row.className = 'clients__row-id';
    row.innerHTML = `
      <td data-rowid="${id}" id="clientid">${shortIdJoin}</td>
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
      <td><ul class="client__row-list">${contactHTML}</ul></td>
      <td>
        <div class="button__group">
          <button class="change__btn" data-id="${id}" data-action="change">Изменить</button>
          <button class="delete__btn" data-id="${id}" data-action="delete">Удалить</button>
        </div>
      </td>`;

    tableBody.appendChild(row);
  });

  // Удаление клиента
  deleteSearchClients();
  changeClient();
}

function sortById(clients, direction) {
  return clients.sort((a, b) => {
    if (direction === 'asc') {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });
}

// Добавляем обработчик события на кнопку сортировки
addEventListener('DOMContentLoaded', ()=> {
  const sortButton = document.querySelector('.btn-sort__id'); // предполагаем, что у кнопки есть id="sortButton"
  sortButton.addEventListener('click', () => {
    // Меняем направление сортировки при каждом нажатии
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    // Перегенерируем таблицу с новым направлением сортировки
    generateTable(fetchData());
  });
})

// Вызов функции для генерации таблицы с передачей fetchData
// generateTable(fetchData());
  
 


  