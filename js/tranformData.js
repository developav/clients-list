// Функция преобразования даты к нужному нам формату
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