function checkResponseStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }
  
  function parseJSON(response) {
    return response.json();
  }


module.exports = {
    checkResponseStatus,
    parseJSON,
};