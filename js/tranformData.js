//Функция преобразования даты к нужному нам формату
import { fetchData } from "./method.js";
export function getDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return date.toLocaleString("ru", options);
  }
// Функция преобразования времени к нужному нам формату
export function getHours(dateString) {
    const time = new Date(dateString);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
    };
    return time.toLocaleString("ru", options);
  }
 
  export function filterClientsaByName(clients,query) {
    return clients.filter(client => {
      const fullName = `${client.surname} ${client.name}${client.lastName}`.toLowerCase();
      return fullName.includes(query.toLowerCase());
    })
  
  }

  export function sortClientsByName(clients) {
    return clients.sort((a, b) => {
      const nameA = `${a.surname} ${a.name} ${a.lastName}.toLowerCase()`;
      const nameB = `${b.surname} ${b.name} ${b.lastName}.toLowerCase()`;
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }
  export const generateHeadTable = () => {
    const table = document.createElement('table');
    table.className = 'clients';
    table.setAttribute('id', 'table')
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



