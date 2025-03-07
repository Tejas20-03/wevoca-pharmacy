export function getGA4ClientId() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.indexOf('_ga=') === 0) {
      const clientId = cookie.substring(4).split('.').slice(-2).join('.');
      return clientId;
    }
  }
  return null;
}
