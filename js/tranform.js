// Функция преобразования даты к нужному нам формату
function getDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    return date.toLocaleString("ru", options);
  }
// Функция преобразования времени к нужному нам формату
function getHours(dateString) {
    const time = new Date(dateString);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
    };
    return time.toLocaleString("ru", options);
  }
  // Функция для определения типа контакта и создания ссылки
function typeText(type, contact) {
    if (type === 'phone') {
      return `<a href="tel:${contact}" class="contact__link">${contact}</a>`;
    } else if (type === 'email') {
      return `<a href="mailto:${contact}" class="contact__link">${contact}</a>`;
    } else {
      return `<span class="contact__link">${contact}</span>`;
    }
  }
  function filterClientsaByName(clients,query) {
    return clients.filter(client => {
      const fullName = `${client.surname} ${client.name}${client.lastName}`.toLowerCase();
      return fullName.includes(query.toLowerCase());
    })
  
  }