// Dichiaro una variabile contenente l'endpoint della chiamata API
const endpoint = 'https://flynn.boolean.careers/exercises/api/random/mail';

// Seleziono gli elementi dal DOM
const domObjects = {
  mainContainer: document.getElementById('main-container'),
  emailList: document.getElementById('email-list'),
  fetchEmailsButton: document.getElementById('fetch-emails'),
  loader: document.querySelector('.loader')
}

// Avvio il fetch delle 10 email al caricamento della pagina
fetchMails();

// Attribuzione della funzione al click del bottone
domObjects.fetchEmailsButton.addEventListener('click', fetchMails);

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
  domObjects.emailList.innerHTML = '';
  const emailArray = [];

  // Avvia il ciclo di funzioni per generare le email
  fetchNextEmail();

  //Funzione che renderizza le mail in pagina
  function fetchingDone() {
    emailArray.forEach(email => {
      const emailItem = document.createElement('li');
      emailItem.classList.add('email-item');
      emailItem.textContent = email;
      domObjects.emailList.appendChild(emailItem);
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