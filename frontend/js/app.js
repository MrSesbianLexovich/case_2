

async function getRequests() {
  const response = await fetch('http://localhost:3000/api/requests');

  if (!response.ok) {
    throw new Error('Не удалось загрузить запросы');
  }

  return response.json();
}

async function createRequest(requestData) {
  const response = await fetch('http://localhost:3000/api/requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message || 'Ошибка создания запроса');
  }

  return result;
}


const requestsList = document.querySelector('#requestsList');
const message = document.querySelector('#message');
const loadRequestsButton = document.querySelector('#loadRequestsButton');
const requestForm = document.querySelector('#requestForm');

function renderRequests(requests) {
  requestsList.innerHTML = '';

  for (const request of requests) {
    const item = document.createElement('li');

    item.textContent = `
      ${request.title} —
      приоритет: ${request.priority},
      статус: ${request.status}
    `;

    requestsList.append(item);
  }
}

loadRequestsButton.addEventListener('click', async () => {
  try {
    const result = await getRequests();

    renderRequests(result.data || []);
    message.textContent = 'Заявки загружены';
  } catch (error) {
    message.textContent = error.message;
  }
});

requestForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(requestForm);

  const requestData = {
    equipmentId: formData.get('equipmentId'),
    title: formData.get('title'),
    description: formData.get('description'),
    priority: formData.get('priority'),
  };

  try {
    await createRequest(requestData);

    message.textContent = 'Заявка создана';
    requestForm.reset();
  } catch (error) {
    message.textContent = error.message;
  }
});
