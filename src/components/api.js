export const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-06',
  headers: {
    authorization: 'd1f78d2c-b56d-404a-8b1d-91f3bcf47ed4',
    'Content-Type': 'application/json'
  }
}

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.status} - error`)
}

//.then(checkResponse(res))