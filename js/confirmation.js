//! Function to fetch data from URL and use it in the response
function getUrlInfo() {
  const data = window.location.search.substring(1).split("&");
  const informationsFormulaire = {};

  for (let i = 0; i < data.length; i++) {
    const [key, value] = data[i].split("=");
    informationsFormulaire[key] = decodeURIComponent(value);
  }
  console.log(informationsFormulaire);
  return informationsFormulaire;
}




//! Function to display the reservation confirmation 
function displayConfirmation() {
  const informationsFormulaire = getUrlInfo();

  document.querySelector('.nom').textContent = `${informationsFormulaire.prenom.split('+').join(' ')} ${informationsFormulaire.nomFamille}` || '';
  document.querySelector('.date').textContent = informationsFormulaire.date || '';
  document.querySelector('.heure').textContent = informationsFormulaire.heure || '';
  document.querySelector('.lieu').textContent = informationsFormulaire.lieu.split('+').join(' ') || '';
  document.querySelector('.personnes').textContent = informationsFormulaire.personnes || '';
}

displayConfirmation()
