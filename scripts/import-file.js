export function apiCall(URL) {
  var promise = fetch(URL);
  return promise;
}
