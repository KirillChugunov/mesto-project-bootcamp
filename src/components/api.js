const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-06',
  headers: {
    authorization: 'd1f78d2c-b56d-404a-8b1d-91f3bcf47ed4',
    'Content-Type': 'application/json'
  }
}

fetch ("${baseurl.config}/users/me", {
  headers{headers.config}
})
 .then((res) => { console.log(res)});
