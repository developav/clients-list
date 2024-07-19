import { deleteClient } from "./method.js";

export function aproveModal(id) {
  const modalGroup = document.createElement('div'),
        modalGroupContainer = document.createElement('div'),
        modalCloseBtn = document.createElement('a');

  modalGroup.className = 'modal__group';
  modalCloseBtn.className = 'modal__group-close';
  modalGroupContainer.className = 'modal__group-block';
  modalGroup.appendChild(modalGroupContainer);
  modalGroupContainer.innerHTML = `
    <h2 class="modal__group-head">Удалить клиента</h2>
    <p class="modal__group-text">Вы действительно хотите удалить клиента с ID: ${id}?</p>
    <a href="#" class="modal__group-delete-btn">Удалить</a>
    <a href="#" class="modal__group-cancel">Отмена</a>
    <a href="#" class="modal__group-cross"></a>
  `;
  document.querySelector('.content').appendChild(modalGroup);

  // Добавление обработчиков событий для кнопок модального окна
  const modalGroupDeleteBtn = modalGroup.querySelector('.modal__group-delete-btn');
  const modalCancelBtn = modalGroup.querySelector('.modal__group-cancel');
  const modalCross = modalGroup.querySelector('.modal__group-cross');

  const removeModal = () => {
    modalGroup.remove();
  };

  modalGroupDeleteBtn.addEventListener('click', async () => {
    await deleteClient(id); // Удаление клиента
    removeModal(); // Закрытие модального окна после удаления
  });

  modalCancelBtn.addEventListener('click', removeModal);
  modalCross.addEventListener('click', removeModal);
}

export function deleteSearchClients() {
  if (document.querySelector('.button__group')) {
    document.querySelectorAll('.button__group').forEach(buttonDel => {
      buttonDel.addEventListener('click', (event) => {
        const deleteBtn = event.target.closest('button[data-action="delete"]');
        if (deleteBtn) {
          deleteBtn.classList.add('del')
          setTimeout(()=>{
            const clientId = deleteBtn.dataset.id; // Получаем значение атрибута data-id клиента
            deleteBtn.classList.remove('del')
            aproveModal(clientId); // Открываем модальное окно подтверждения удаления
          },1000)
          
        }
      });
    })

  }
}


