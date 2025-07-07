export async function fetchData(route = '', data = {}, methodType = 'GET') {
  const response = await fetch(`http://localhost:8000${route}`, {
    method: methodType,
    headers: {
      'Content-Type': 'application/json'
    },
    body: methodType !== 'GET' ? JSON.stringify(data) : undefined
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw await response.json();
  }
}
