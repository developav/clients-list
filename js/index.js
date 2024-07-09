import { generateHeadTable } from "./generateTable.js";
import { generateTable } from './generateTable.js';
import { fetchData } from "./method.js";
import { createContactModalAdd } from "./addClients.js";
import { clientPost } from "./addClients.js";

const saveButton = document.getElementById('btn__change');

// Функция создания таблицы
generateHeadTable();

//Задержка для прелоадера
setTimeout(()=> {
    document.querySelector('.check__label').classList.add('hide__loader');
    generateTable(fetchData());
  }, 2000);

//Вызов модального окна для добавления клиента
createContactModalAdd();
// Функция добавления клиента на сервер
clientPost();
