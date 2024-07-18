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
        <th class="clients__head clients-head__id">
          <button class="btn-sort btn-sort__id">ID
            <svg class="btn-sort__id-arrow" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.49691e-07 4L0.705 4.705L3.5 1.915L3.5 8L4.5 8L4.5 1.915L7.29 4.71L8 4L4 -3.49691e-07L3.49691e-07 4Z" fill="#B79DFF"/>
            </svg>
          </button>
        </th>
        <th class="clients__head clients-head__fio">
          <button  class="btn-sort btn-sort__fio">Фамилия Имя Отчество
           <svg class="btn-sort__fio-arrow" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.49691e-07 4L0.705 4.705L3.5 1.915L3.5 8L4.5 8L4.5 1.915L7.29 4.71L8 4L4 -3.49691e-07L3.49691e-07 4Z" fill="#B79DFF"/>
            </svg>
            <svg  width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.37109 8L4.6582 6.01758H1.92871L1.23047 8H0L2.6709 0.832031H3.94043L6.61133 8H5.37109ZM4.35059 5.01172L3.68164 3.06836C3.63281 2.93815 3.56445 2.73307 3.47656 2.45312C3.39193 2.17318 3.33333 1.9681 3.30078 1.83789C3.21289 2.23828 3.08431 2.67611 2.91504 3.15137L2.27051 5.01172H4.35059ZM6.96289 5.80762V4.83105H9.47266V5.80762H6.96289ZM13.0322 5.13867L11.2646 8H9.93164L11.9434 4.87012C11.0319 4.55436 10.5762 3.8903 10.5762 2.87793C10.5762 2.22363 10.8024 1.72396 11.2549 1.37891C11.7074 1.03385 12.373 0.861328 13.252 0.861328H15.3955V8H14.2236V5.13867H13.0322ZM14.2236 1.83789H13.2959C12.8044 1.83789 12.4268 1.92578 12.1631 2.10156C11.9027 2.27409 11.7725 2.55729 11.7725 2.95117C11.7725 3.33529 11.8994 3.63477 12.1533 3.84961C12.4072 4.06445 12.8011 4.17188 13.335 4.17188H14.2236V1.83789Z" fill="#B79DFF"/>
            </svg>
          </button>
        </th>
        <th class="clients__head clients-head__create">
          <button class="btn-sort btn-sort__create">Дата и время создания
            <svg class="btn-sort__create-arrow" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.49691e-07 4L0.705 4.705L3.5 1.915L3.5 8L4.5 8L4.5 1.915L7.29 4.71L8 4L4 -3.49691e-07L3.49691e-07 4Z" fill="#B79DFF"/>
            </svg>
          </button>
        </th>
        <th class="clients__head clients-head__last">
          <button class="btn-sort btn-sort__last">Последние изменения
            <svg class="btn-sort__last-arrow" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.49691e-07 4L0.705 4.705L3.5 1.915L3.5 8L4.5 8L4.5 1.915L7.29 4.71L8 4L4 -3.49691e-07L3.49691e-07 4Z" fill="#B79DFF"/>
            </svg>
          </button>
        </th>
        <th class="clients__head clients-head__contact"><button class="btn-sort btn-sort__contact">Контакты</button></th>
        <th class="clients__head clients-head__actions"><button class="btn-sort">Действия</button></th>
      </thead>
      <tbody class="clients__list"></tbody>`;
}



