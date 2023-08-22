import Clients from "./clients.js";
import clientsAdd from "./clientsAdd.js";

export default async function clientsGet() {
  try {
    // Делаем запрос на сервер
    const response = await fetch('http://localhost:3000/api/clients', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
    });
    
    const result = await response.json();

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
        <th class="clients__head clients-head__id"><button class="btn-sort">Действия</button></th>
      </thead>
      <tbody class="clients__list"></tbody>
    `;

    function getDate(dateString) {
      const date = new Date(dateString);
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        // hour: 'numeric',
        // minute: 'numeric',
        
      };
     
      return date.toLocaleString("ru", options);
    }
    function getHours(dateString) {
      const time = new Date(dateString);
      const options = {
        // year: 'numeric',
        // month: 'numeric',
        // day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        
      };
     
      return time.toLocaleString("ru", options);
    }

    result.forEach(client => {
      const { id, surname, name, lastName, createdAt, updatedAt, contacts } = client;
      const fullName = `${surname} ${name} ${lastName}`;
      const createDateTime = getDate(createdAt);
      const createTime = getHours(createdAt)
      const updateDateTime = getDate(updatedAt);
      const updateTime = getHours(updatedAt);
      const contact = contacts[0]?.value || '';
      const type = contacts[0]?.type || '';
      function typeText(){
        if(type=='phone') {
          const tel = window.location.href = `tel:${contact}`;
        } else if (type=='email'){
          const email = window.location.href = `mailto:${contact}`;
        }
      }
      const row = document.createElement('tr');
      row.className = 'clients__row-id';
      row.innerHTML = `
        <td data-rowid="user.id" id="clientid">${id}</td>
        <td colspan=1>${fullName}</td>
        <td>${createDateTime} <span class="create__time time">${createTime}</span></td>
        <td>${updateDateTime} <span class="update__time time">${updateTime}</span></td>
        <td><li><a><span>${type}</span></a></li></td>
        <td>
          <button class="change__btn" data-id="${id}" data-action="change">Изменить</button>
          <button class="delete__btn" data-id="${id}" data-action="delete">Удалить</button>
        </td>
      `;
      document.querySelector('.clients__list').appendChild(row);
    });

    document.querySelector('.clients__list').addEventListener('click', async (event) => {
      const deleteBtn = event.target.closest('button[data-action="delete"]');
      if (deleteBtn) {
        const clientId = deleteBtn.dataset.id; // Получаем значение атрибута data-id клиента
        await deleteClient(clientId); // Вызываем функцию удаления клиента
      }
    });
  } catch (error) {
    console.log(`Ошибка при получении данных о клиентах: ${error}`);
  }
}

async function deleteClient(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      console.log(`Клиент с id=${id} успешно удален!`);
    } else {
      console.log(`Ошибка при удалении клиента с id=${id}`);
    }
  } catch (error) {
    console.log(`Ошибка при удалении клиента с id=${id}: ${error}`);
  }
}

 async function changeClient(){
    const changeBtn = document.querySelector('.change__btn')
    changeBtn.addEventListener('click', function (){
        
    })
}

clientsGet();


