const hour = 3600000;
function formatDate(num) {
  return JSON.stringify(new Date(num - hour)).slice(1, -1);
}

module.exports = formatDate;
