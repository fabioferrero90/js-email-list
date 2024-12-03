// Mostra - Nasconde il loader
function toggleLoader(show) {
  if (show) {
    domObjects.loader.setAttribute('data-content', randomLoadingPhrase())
    domObjects.loader.style.opacity = 1;
    domObjects.mainContainer.classList.remove('fluid-transition');
    domObjects.mainContainer.style.opacity = 0;
  } else {
    setTimeout(() => {
      domObjects.loader.style.opacity = 0;
      domObjects.mainContainer.classList.add('fluid-transition');
      domObjects.mainContainer.style.opacity = 1;
    }, 2000)
  }
}

// Crea una frase random per il caricamento
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