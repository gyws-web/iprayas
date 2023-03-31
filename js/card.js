const father = document.querySelector(".card__father");
const card = document.querySelector(".card");

father.addEventListener('click',()=>{
  card.classList.toggle('rotate');
});

