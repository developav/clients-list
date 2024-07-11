
// Функция получения списка клиентов
export async function clientsGet() {
  try{
    const response = await fetch('http://localhost:3000/api/clients', {
        method: 'GET',
        headers: {'Content-type': 'application/json'},
      });
      const result = await response.json();
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