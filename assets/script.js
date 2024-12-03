// Dichiaro una variabile contenente l'endpoint della chiamata API
const endpoint = 'https://flynn.boolean.careers/exercises/api/random/mail';

// Seleziono gli elementi dal DOM
const mainContainer = document.getElementById('main-container');
const emailList = document.getElementById('email-list');
const fetchEmailsButton = document.getElementById('fetch-emails');
const loader = document.querySelector('.loader');
const loaderText = document.querySelector('.loader:before');

// Fetch iniziale delle 10 email al caricamento della pagina
fetchMails();

// Attribuzione della funzione al click del bottone
fetchEmailsButton.addEventListener('click', fetchMails);

function generateMail(returnMail) {
  axios.get(endpoint)
    .then(response => {
      returnMail(response.data.response);
    })
    .catch(error => {
      console.log(error);
    })
}

function fetchMails() {
  toggleLoader(true);
  // Pulisco la lista prima di generare nuove email
  emailList.innerHTML = '';
  const emailArray = [];

  // Avvia il ciclo di funzioni per generare le email
  fetchNextEmail();

  //Dichiaro le funzioni internamente per una maggiore leggibilità:
  //Funzione che renderizza le mail in pagina
  function fetchingDone() {
    emailArray.forEach(email => {
      const emailItem = document.createElement('li');
      emailItem.classList.add('email-item');
      emailItem.textContent = email;
      emailList.appendChild(emailItem);
    });
    toggleLoader(false);
  }

  //Funzione che genera la mail successiva e la aggiunge all'array, controllando se sono state generate abbastanza mail alla fine di ogni inserimento
  function fetchNextEmail() {
    generateMail(email => {
      emailArray.push(email);
      emailArray.length === 10 ? fetchingDone() : fetchNextEmail();
    });
  }
}

function toggleLoader(show) {
  if (show) {
    loader.setAttribute('data-content', randomLoadingPhrase())
    console.log(randomLoadingPhrase());
    loader.style.opacity = 1;
    mainContainer.classList.remove('fluid-transition');
    mainContainer.style.opacity = 0;
  } else {
    setTimeout(() => {
      loader.style.opacity = 0;
      mainContainer.classList.add('fluid-transition');
      mainContainer.style.opacity = 1;
    }, 2000)
  }
}

function randomLoadingPhrase() {
  const phrases = [
    "Le email stanno arrivando… con calma, una ad una!",
    "Caricamento email in corso… il postino sta lavorando!",
    "I pinguini del server stanno ordinando le email… un momento!",
    "Coltivando nuove email nel nostro giardino digitale…",
    "Generando email stravaganti... attendi un secondo!",
    "Mescolando bit e byte per creare email uniche…",
    "Pescando indirizzi email dal cyberspazio… ci siamo quasi!",
    "Le email stanno prendendo vita… solo un momento!"
  ]
  const extracted = Math.ceil(Math.random() * phrases.length - 1)
  return phrases[extracted]
}