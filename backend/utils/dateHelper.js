// Date utility helpers
const formatDate = (date) => new Date(date).toLocaleDateString('en-ET');
const isWeekend = (date) => [0, 6].includes(new Date(date).getDay());
module.exports = { formatDate, isWeekend };
