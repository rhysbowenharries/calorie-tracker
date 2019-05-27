const RequestHelper = function (url) {
  this.url = url;
};

RequestHelper.prototype.get = function () {
  return fetch(this.url)
    .then((response) => response.json())
    .catch(console.error)
};

RequestHelper.prototype.post = function(payload, headers) {
  return fetch(this.url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: headers
  })
  .then(response => response.json())
  .catch(console.error)
}

RequestHelper.prototype.delete = function (id) {
  return fetch(`${this.url}/${id}`, {
    method: 'DELETE'
  })
    .then((response) => response.json())
    .catch(console.error)
};

RequestHelper.prototype.put = function (id, payload) {
  return fetch(`${this.url}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {'Content-Type': 'application/json'}
  })
    .then((response) => response.json())
    .catch(console.error)
}

module.exports = RequestHelper;
