import { deleteClient } from "./method.js";

export function aproveModal (id){
    const modalGroup = document.createElement('div'),
          modalGroupContainer = document.createElement('div'),
          modalCloseBtn = document.createElement('a');
  
    modalGroup.className = 'modal__group';
    modalCloseBtn.className = 'modal__group-close';
    modalGroupContainer.className = 'modal__group-block';
    modalGroup.appendChild(modalGroupContainer);
    modalGroupContainer.innerHTML = `
    <h2 class="modal__group-head">Удалить клиента</h2>
    <p class="modal__group-text">Вы действительно хотите удалить клиента c ID: ${id}?</p>
    <a href="#" class="modal__group-delete-btn">Удалить</a>
    <a href="#" class="modal__group-cancel">Отмена</a>
    <a href="#" class="modal__group-cross"></a>
    `;
    document.querySelector('.content').appendChild(modalGroup)
  };

export function deleteSearchClients () {
    if ( document.querySelector('.clients__list')){
        document.querySelector('.clients__list').addEventListener('click', async (event) => {
            const deleteBtn = event.target.closest('button[data-action="delete"]');
            function deleteAproveModal (elem) {
              elem.parentNode.removeChild(elem);
            }
            if (deleteBtn) {
              const clientId = deleteBtn.dataset.id; // Получаем значение атрибута data-id клиента
             await deleteBtn.addEventListener('click', () => {
                aproveModal(clientId);
                const modalGroupDeleteBtn = document.querySelector('.modal__group-delete-btn');
                const modalCancelBtn = document.querySelector('.modal__group-cancel');
                const modalCross = document.querySelector('.modal__group-cross')
                modalGroupDeleteBtn.addEventListener('click', () => {
                   deleteClient(clientId); // Вызываем функцию удаления клиента
                })
                modalCancelBtn.addEventListener('click', () => {
                  const modalGroup = document.querySelector('.modal__group')
                  deleteAproveModal(modalGroup);
                });
                modalCross.addEventListener('click', () => {
                  const modalGroup = document.querySelector('.modal__group')
                  deleteAproveModal(modalGroup);
                })
              })
            }
          });
    }

  }