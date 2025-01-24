const taskList = document.querySelectorAll('.task');
const addModal = document.querySelector('.modal-add');
const addModalOpenButton = document.querySelector('.button__open-add-modal');
const addModalCloseButton = document.querySelector('.modal-add .button__close');
const addModalCancelButton = document.querySelector('.modal-add .button__cancel');
const addModalForm = document.querySelector('#add-task-form');
const addModalSubmitButton = document.querySelector('.modal-add .modal__add');
const editModal = document.querySelector('.modal-edit');
const editModalOpenButtons = document.querySelectorAll('.button__edit');
const editModalCloseButton = document.querySelector('.modal-edit .button__close');
const editModalCancelButton = document.querySelector('.modal-edit .button__cancel');
const editModalForm = document.querySelector('#edit-task-form');
const editModalFormInputId = document.querySelector('.modal-edit #edit-task-id');
const editModalFormInputTitle = document.querySelector('.modal-edit #edit-title');
const editModalFormInputDescription = document.querySelector('.modal-edit #edit-description');
const editModalSubmitButton = document.querySelector('.modal-edit .modal__add');
const deleteTaskButtons = document.querySelectorAll('.button__delete')


// FUNCTIONS 
//
/**
 * Marca una tarea como completada o no completada, y actualiza su estado en el servidor.
 * @param {HTMLElement} task - El contenedor de la tarea.
 * @param {HTMLInputElement} checkbox - El checkbox que indica el estado de la tarea.
 */
function markTaskAsDone(task, checkbox) {
  const taskTitle = task.querySelector('.task__title');
  const taskDesciption = task.querySelector('.task__description');
  const taskId = task.getAttribute('data-id');
  const status = checkbox.checked ? 1 : 0; // Determina el estado según el checkbox

  // Actualiza el estilo visual
  if (checkbox.checked) {
      taskTitle.classList.add('strikethrough');
      taskDesciption.classList.add('strikethrough');
  } else {
      taskTitle.classList.remove('strikethrough');
      taskDesciption.classList.remove('strikethrough');
  }

  // Enviar el estado actualizado al servidor
  fetch(`http://localhost:8080/tasks/${taskId}/status`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
  })
      .then(response => {
          if (response.ok) {
              console.log("Task status updated successfully");
          } else {
              return response.json().then(errorData => {
                  console.error("Error updating task status:", errorData.message);
              });
          }
      })
      .catch(error => {
          console.error("Fetch error:", error);
      });
}

/**
 * Renderiza una tarea en el DOM.
 * @param {Object} task - El objeto de la tarea a renderizar.
 */
function renderTask(task) {     
  const taskElement = document.createElement('div');
  taskElement.classList.add('task');
  taskElement.setAttribute('data-id', task.id); 

  const taskHeader = document.createElement('div');
  taskHeader.classList.add('task__header');

  const checkbox = document.createElement('input');
  checkbox.classList.add('task__checkbox');
  checkbox.type = 'checkbox';
  checkbox.checked = task.status === 1;

  checkbox.addEventListener('change', () => {
    markTaskAsDone(taskElement, checkbox);
  });

  taskHeader.appendChild(checkbox);

  const taskTitle = document.createElement('div');
  taskTitle.classList.add('task__title');
  taskTitle.textContent = task.title;
  if (task.status === 1) taskTitle.classList.add('strikethrough');

  const taskControls = document.createElement('div');
  taskControls.classList.add('task__controls');

  // Crear y añadir los botones de editar y eliminar
  const editButton = createEditButton(taskElement);
  const deleteButton = createDeleteButton(task.id);

  taskControls.appendChild(editButton);
  taskControls.appendChild(deleteButton);

  taskHeader.appendChild(taskTitle);
  taskHeader.appendChild(taskControls);

  const taskDescription = document.createElement('div');
  taskDescription.classList.add('task__description');
  taskDescription.textContent = task.description;

  taskElement.appendChild(taskHeader);
  taskElement.appendChild(taskDescription);

  document.querySelector('.task-list .task-list__wrapper').appendChild(taskElement);
}

/**
 * Crea un botón de edición para una tarea.
 * @param {HTMLElement} taskElement - El contenedor de la tarea.
 * @returns {HTMLElement} El botón de editar.
 */
function createEditButton(taskElement) {
  const editButton = document.createElement('button');
  editButton.classList.add('button', 'button--primary', 'button__edit');
  editButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
    </svg>
    <div class="button__text">Editar</div>
  `;
  editButton.addEventListener('click', () => {
    populateEditModal(taskElement);
    editModal.showModal();
  });
  return editButton;
}

/**
 * Crea un botón de eliminación para una tarea.
 * @param {number} taskId - El ID de la tarea a eliminar.
 * @returns {HTMLElement} El botón de eliminar.
 */
function createDeleteButton(taskId) {
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('button', 'button--danger', 'button__delete');
  deleteButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
    </svg>
    <div class="button__text">Eliminar</div>
  `;
  deleteButton.addEventListener('click', () => {
    deleteTask(taskId);
  });
  return deleteButton;
}

/**
 * Crea una nueva tarea en el servidor y la renderiza en el DOM.
 * @param {string} title - El título de la tarea.
 * @param {string} description - La descripción de la tarea.
 */
function createNewTask(title, description) {
  const taskData = { title, description };

  fetch('http://localhost:8080/tasks', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  })
    .then(response => {
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      return response.json();
    })
    .then(newTask => renderTask(newTask))
    .catch(error => console.error("Error al crear la tarea:", error));
}

/**
 * Actualiza una tarea existente en el servidor y la refleja en la UI.
 * @param {number} taskId - El ID de la tarea a actualizar.
 * @param {string} title - El nuevo título de la tarea.
 * @param {string} description - La nueva descripción de la tarea.
 */
function updateTask(taskId, title, description) {
  fetch(`http://localhost:8080/tasks/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  })
  .then(response => {
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
  })
  .then(updatedTask => {
    const task = document.querySelector(`.task[data-id="${updatedTask.id}"]`);
    task.querySelector('.task__title').textContent = updatedTask.title;
    task.querySelector('.task__description').textContent = updatedTask.description;
    console.log('Task updated successfully');
  })
  .catch(error => console.error('Error:', error));
}

/**
 * Elimina una tarea del servidor y del DOM.
 * @param {number} taskId - El ID de la tarea a eliminar.
 */
function deleteTask(taskId) {
  fetch(`http://localhost:8080/tasks/${taskId}`, { method: 'DELETE' })
    .then(response => {
      if (response.ok) {
        document.querySelector(`.task[data-id="${taskId}"]`).remove();
      } else {
        console.error('Error al eliminar la tarea. Código de estado:', response.status);
      }
    })
    .catch(error => console.error('Hubo un error al intentar eliminar la tarea:', error));
}

/**
 * Rellena el modal de edición con los datos de la tarea.
 * @param {HTMLElement} taskElement - El contenedor de la tarea.
 */
function populateEditModal(taskElement) {
  const taskTitle = taskElement.querySelector('.task__title').textContent.trim();
  const taskDescription = taskElement.querySelector('.task__description').textContent.trim();
  const taskId = taskElement.getAttribute('data-id');

  editModalFormInputId.value = taskId;
  editModalFormInputTitle.value = taskTitle;
  editModalFormInputDescription.value = taskDescription;
}




// EVENT LISTENERS
//
document.addEventListener('DOMContentLoaded', () => {
  // Obtener las tareas al cargar la página
  fetch('http://localhost:8080/tasks')
    .then(response => response.json())
    .then(data => {
      data.forEach(task => {
        renderTask(task);
      });
    });
});

// Abrir el modal para agregar una nueva tarea
addModalOpenButton.addEventListener("click", () => {
  addModal.showModal();
});

// Cerrar el modal de agregar tarea
addModalCloseButton.addEventListener("click", () => {
  addModal.close();
});

// Cancelar y cerrar el modal de agregar tarea
addModalCancelButton.addEventListener("click", () => {
  addModal.close();
});

// Crear nueva tarea desde el modal
addModalSubmitButton.addEventListener('click', (event) => {
  event.preventDefault();

  // Verificar que el formulario sea válido antes de crear la tarea
  if (addModalForm.checkValidity()) {
    const formData = new FormData(addModalForm);
    const title = formData.get('title');
    const description = formData.get('description');

    // Llamar a la función para crear la tarea
    createNewTask(title, description);

    // Cerrar el modal después de agregar la tarea
    addModal.close();
  } else {
    addModalForm.reportValidity();
  }
});

// Escuchar el cambio de estado de las tareas (checkbox)
taskList.forEach(task => {
  const checkbox = task.querySelector('.task__checkbox');

  checkbox.addEventListener('change', () => {
    markTaskAsDone(task, checkbox)
  });
});

// Abrir el modal para editar una tarea
editModalOpenButtons.forEach(editModalOpenButton => {
  editModalOpenButton.addEventListener('click', (event) => {
    // Llenar el formulario de edición con los datos actuales de la tarea
    const task = event.target.closest('.task'); 
    populateEditModal(task);
    editModal.showModal();
  });
});

// Cerrar el modal de edición
editModalCloseButton.addEventListener("click", () => {
  editModal.close();
});

// Cancelar y cerrar el modal de edición
editModalCancelButton.addEventListener("click", () => {
  editModal.close();
});

// Actualizar la tarea desde el modal de edición
editModalSubmitButton.addEventListener('click', (event) => {
  event.preventDefault();

  // Verificar que el formulario de edición sea válido
  if (editModalForm.checkValidity()) {
    const formData = new FormData(editModalForm);
    const taskId = formData.get('taskId');
    const title = formData.get('title').trim();
    const description = formData.get('description').trim();

    // Llamar a la función para actualizar la tarea
    updateTask(taskId, title, description);

    // Cerrar el modal luego de actualizar la tarea
    editModal.close();
  } else {
    editModalForm.reportValidity();
  }
});

// Eliminar tarea al hacer click en el botón de eliminar
deleteTaskButtons.forEach(deleteTaskButton => {
  deleteTaskButton.addEventListener('click', (event) => {
    const task = event.target.closest('.task');
    const taskId = task.getAttribute('data-id');
    deleteTask(taskId);
  });
});