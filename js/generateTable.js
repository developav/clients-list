import { getDate } from "./tranformData.js";
import { getHours } from './tranformData.js';
import { typeText } from './contact.js';
import { deleteSearchClients } from "./deleteClients.js";
import { changeClient } from "./changeClient.js";
import { filterClientsaByName } from './tranformData.js';
import { fetchData } from "./method.js";

export async function generateTable(fetchDataFunction) {
    const tableBody = document.querySelector('.clients__list');
    tableBody.innerHTML = ''; // Очищаем таблицу перед заполнением
    const clients = await fetchDataFunction;
    if(clients.lenght === 0){
        console.log('no data')
        return;
    }
    clients.forEach(client => {
      const { id, surname, name, lastName, createdAt, updatedAt, contacts } = client;
      const fullName = `${surname}  ${name}  ${lastName}`;
      const createDateTime = getDate(createdAt);
      const createTime = getHours(createdAt);
      const updateDateTime = getDate(updatedAt);
      const updateTime = getHours(updatedAt);
//Фильтр при вводе input
      const inputFio = document.getElementById('inputFio');
        inputFio.addEventListener('input', (event) => {
        const query = event.target.value;
        const filteredClients = filterClientsaByName(clients, query)
        generateTable(filteredClients);
})
  


      const shortId = id.split('');
      const shortIdSlice = shortId.slice(6,13);
      const shortIdJoin = shortIdSlice.join('')
      console.log(id)
    
    
      const contactHTML = contacts.map(contact => {
        return `<li class="contacts__list">${typeText(contact.type, contact.value)}</li>`;
      }).join('');
  
  
      const row = document.createElement('tr');
      row.className = 'clients__row-id';
      row.innerHTML = `
        <td data-rowid="${id}" id="clientid">${shortIdJoin}</td>
        <td colspan="1">${fullName}</td>
        <td>${createDateTime} <span class="create__time time">${createTime}</span></td>
        <td>${updateDateTime} <span class="update__time time">${updateTime}</span></td>
        <td><ul class="client__row-list">${contactHTML}</ul></td>
        <td>
          <button class="change__btn" data-id="${id}" data-action="change">Изменить</button>
          <button class="delete__btn" data-id="${id}" data-action="delete">Удалить</button>
        </td>`;
  
      tableBody.appendChild(row);
    });
  
    // Удаление клиента
    deleteSearchClients();
    changeClient();
  }
  
  export function generateHeadTable(){
    const table = document.createElement('table');
    table.className = 'clients';
    document.querySelector('.content').appendChild(table);
    table.innerHTML = `
      <thead>
        <th class="clients__head clients-head__id"><button class="btn-sort btn-sort__id">ID</button></th>
        <th class="clients__head clients-head__fio"><button class="btn-sort btn-sort__fio">Фамилия Имя Отчество</button></th>
        <th class="clients__head clients-head__create"><button class="btn-sort btn-sort__create">Дата и время создания</button></th>
        <th class="clients__head clients-head__last"><button class="btn-sort btn-sort__last">Последние изменения</button></th>
        <th class="clients__head clients-head__contact"><button class="btn-sort btn-sort__contact">Контакты</button></th>
        <th class="clients__head clients-head__actions"><button class="btn-sort">Действия</button></th>
      </thead>
      <tbody class="clients__list"></tbody>`;
}


  