const utilfunctions = {}

utilfunctions.fetchData = (setData) => {
  fetch('https://api.quicksell.co/v1/internal/frontend-assignment/')
  .then((response) => response.json())
  .then((json) => {
    setData(json);
  })
  .catch((error) => {
    console.error(error);
  });
}

utilfunctions.setCookie = (name, value) => {
  document.cookie = `${name}=${value}; Secure`;
}

utilfunctions.getCookie = (name) => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (name === cookieName) {
      return cookieValue;
    }
  }
  return null; // Cookie not found
}

export default utilfunctions;