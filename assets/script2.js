// Dichiaro una variabile contenente l'endpoint della chiamata API
const endpoint = 'https://flynn.boolean.careers/exercises/api/random/mail';

// Seleziono gli elementi dal DOM
const domObjects = {
  mainContainer: document.getElementById('main-container'),
  emailList: document.getElementById('email-list'),
  fetchEmailsButton: document.getElementById('fetch-emails'),
  loader: document.querySelector('.loader')
}

// Attribuzione della funzione al click del bottone
domObjects.fetchEmailsButton.addEventListener('click', fetchMails);

// Avvio il Fetch delle 10 email al caricamento della pagina
fetchMails();

// Logica generale avviata al caricamento della pagina
function fetchMails() {

  // Dichiaro l'array vuoto delle mail
  const emailArray = [];

  // Mostro il Loader
  toggleLoader(true);

  // Pulisco la lista prima di generare nuove email
  domObjects.emailList.innerHTML = '';

  // Creo una funzione che stampa le mail in pagina quando l'array è completo
  function fetchingDone() {
    emailArray.forEach(email => {
      const emailItem = document.createElement('li');
      emailItem.classList.add('email-item');
      emailItem.textContent = email;
      domObjects.emailList.appendChild(emailItem);
    });

    //Nascondo il loader
    toggleLoader(false);
  }

  // Creo una funzione che attinge alla API per generare l'array di mail
  function generateMail() {
    axios.get(endpoint)
      .then(response => {
        emailArray.push(response.data.response);
        emailArray.length === 10 ? fetchingDone() : generateMail();
      })
      .catch(error => {
        console.log(error);
      })
  }

  // Avvio la generazione di mail
  generateMail()
}

