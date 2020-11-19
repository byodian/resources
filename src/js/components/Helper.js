const truncateString = function truncateString(str, num=20) {
  return str.length < num ? str : str.slice(0, num) + '...';
}

const uniqueArray = function(array) {
  return [...new Set(array)];
}
export {truncateString, uniqueArray};