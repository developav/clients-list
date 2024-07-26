
import { filterClientsaByName } from './tranformData.js';
import { generateTable } from './generateTable.js';
// Функция получения списка клиентов
const URL_CLIENT_LIST = new URL('http://localhost:3000/api/clients')
export async function clientsGet() {
  try{
    const response = await fetch(URL_CLIENT_LIST, {
        method: 'GET',
        headers: {'Content-type': 'application/json'},
      });
      const result = await response.json();
      const inputFio = document.getElementById('inputFio');
      inputFio.addEventListener('input', async (event) => {
        const query = event.target.value;
          const filteredClients = await filterClientsaByName(result, query);
          generateTable(filteredClients); // исправлено вызов функции
      });
      console.log(result)
      if (!response.ok) {
        throw new Error('Failed to fetch clients data');
      }
      return result
  } catch(error){
    console.error()
    throw error
  }   
}
// Преобразовываем полученный список клиеньов
export const fetchData = async () => {
    try{
        const data = await clientsGet();
        return data;
    }
    catch(error) {
        console.error('error')
    }
}
// Функция удаления клиента
export async function deleteClient(id) {
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
export const addClient =  async (data) => {
    try{
        const response =  await fetch('http://localhost:3000/api/clients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(data),
        })
    } catch (error) {
        console.error(error)
    }
}