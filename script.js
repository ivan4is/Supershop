let themeToggle = document.getElementById('themeToggle');
let body = document.body;
let header = document.querySelector('header');
let footer = document.querySelector('footer');
let cards = document.querySelectorAll('.card');

let darkTheme = false;

themeToggle.addEventListener('click', function() {
  darkTheme = !darkTheme;

  if(darkTheme){
    // Темна тема
    body.style.background = '#121212';
    body.style.color = '#f5f5f5';
    header.style.background = '#1e1e1e';
    header.style.color = '#f5f5f5';
    footer.style.background = '#1e1e1e';
    footer.style.color = '#f5f5f5';
    for(let i = 0; i < cards.length; i++){
      cards[i].style.background = '#1e1e1e';
      cards[i].style.color = '#f5f5f5';
      cards[i].style.border = '1px solid #444';
    }
  } else {
    // Світла тема
    body.style.background = '#fff';
    body.style.color = '#000';
    header.style.background = '#000';
    header.style.color = '#fff';
    footer.style.background = '#000';
    footer.style.color = '#fff';
    for(let i = 0; i < cards.length; i++){
      cards[i].style.background = '#fff';
      cards[i].style.color = '#000';
      cards[i].style.border = '1px solid #ccc';
    }
  }
});


