const today = document.querySelector(".card-footer");

const currentDate = new Date();

const date = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();


today.innerHTML = `${date}/${month}/${year}  ${hours}:${minutes}`;