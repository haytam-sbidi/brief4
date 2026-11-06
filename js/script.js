/*
 * AutoPark — Partie 2 : Composez votre location
 * Starter JavaScript — à compléter par les apprenants.
 * Charger ce fichier dans votre HTML avec l'attribut defer.
 *
 * Parcours : véhicule et dates → récupération → options → récapitulatif.
 * Les tarifs sont exprimés en MAD.
 */

// 1. CONFIGURATION : les données proposées par l'agence.
const config = {

  modesRecuperation: [
    { id: "agence", nom: "À l’agence", fraisFixes: 0 },
    { id: "aeroport", nom: "À l’aéroport", fraisFixes: 150 },
    { id: "adresse", nom: "À une adresse", fraisFixes: 100 },
  ],

  agences: ["Casablanca — Centre-ville", "Rabat — Agdal", "Marrakech — Guéliz"],

  aeroports: ["Casablanca — Mohammed V", "Rabat — Salé", "Marrakech — Ménara"],

  options: [
    { id: "siegeBebe", nom: "Siège bébé", prixParJour: 30 },
    {
      id: "conducteurSupplementaire",
      nom: "Conducteur supplémentaire",
      prixParJour: 200,
    },
  ],
};

// 2. SÉLECTION : les choix de l'utilisateur, à actualiser avec les formulaires.
// Les identifiants correspondent aux id définis dans config.
// Les dates seront des chaînes au format AAAA-MM-JJ (valeur d'un input date).
const selectedConfig = {
  etape: 1,
  voitureId: null,
  dateDebut: "",
  dateFin: "",
  modeRecuperation: "agence",

  recuperation: {
    // Mode agence uniquement.
    heureRecuperation: "",

    // Mode aeroport uniquement.
    aeroport: "",
    numeroVol: "",
    heureArrivee: "",

    // Mode adresse uniquement.
    ville: "",
    adresse: "",
    heureLivraison: "",
  },

  options: {
    siegeBebe: false,
    conducteurSupplementaire: false,
  },
};

/*
 * 3. À VOUS DE JOUER
 *
 * 1) Sélectionner vos éléments HTML et afficher les voitures depuis config.
 * 2) Écouter les événements et mettre à jour selectedConfig.
 *    Attention : la valeur d'un select est une chaîne ; voitureId est un nombre.
 *    Pour une case à cocher, utiliser checked pour récupérer true ou false.
 * 3) Gérer les boutons Précédent / Suivant et afficher une seule étape.
 * 4) Afficher les champs du mode de récupération sélectionné.
 *    Masquer et désactiver les autres ; adapter required.
 * 5) Valider l'étape courante avant de passer à la suivante.
 * 6) Calculer et actualiser le prix quand les choix changent.
 * 7) Afficher le récapitulatif des seuls champs concernés, puis confirmer.
 * 8) Permettre de recommencer avec les valeurs initiales.
 *
 * RÈGLES DU PRIX
 * - Les deux dates sont incluses : du 10 au 12 = 3 jours.
 * - Une location sur une même date = 1 jour.
 * - Le début ne peut pas être passé ; la fin ne peut pas précéder le début.
 * - Total = jours × (prixParJour de la voiture + options par jour)
 *           + fraisFixes du mode de récupération.
 * - Les frais de récupération sont ajoutés une seule fois.
 * - Aucun renseignement supplémentaire pour le conducteur.
 * - Ne pas afficher un total numérique tant que la voiture ou les dates
 *   sont manquantes ou invalides.
 *
 * Exemple de contrôle : Sandero, du 10 au 12, siège bébé, aéroport
 * → 3 × (250 + 30) + 150 = 990 MAD.
 */

let form1 = document.getElementById("form1")
let destination = document.getElementById("affichage")
let start = document.getElementById("date-debut")
let end = document.getElementById("date-fin")
let carname = document.getElementById("vehicule")
let carcat = document.getElementById("vehicule-cat")
let carprice = document.getElementById("prix-vehicule")
let resetbtn = document.getElementById("reset")
let period = document.getElementById("period")
let duree = document.getElementById("duree")
let total = document.getElementById("total")
let next1 = document.getElementById("next1")
let etape1 = document.getElementById("etape1")
let etape2 = document.getElementById("etape2")
let stepnum1 = document.getElementById("stepnum1")
let stepname1 = document.getElementById("stepname1")
let stepnum2 = document.getElementById("stepnum2")
let stepname2 = document.getElementById("stepname2")

let voitures = JSON.parse(localStorage.getItem("data"))
let duration
let prix
let num
let actual
let time = new Date()
let ti = time.getTime()
console.log(ti)
console.log(start.value)

display()

function display() {
  destination.textContent = ""
  for (let i = 0; i < voitures.length; i++) {
    const label = document.createElement("label")
    const div1 = document.createElement("div")
    const div2 = document.createElement("div")
    const h6 = document.createElement("h6")
    const input = document.createElement("input")
    const h4 = document.createElement("h4")
    const h61 = document.createElement("h6")
    const h41 = document.createElement("h4")

    div1.setAttribute("class", "choix")
    div2.setAttribute("class", "choix-top")
    h6.setAttribute("class", "car-categorie")
    input.setAttribute("type", "radio")
    input.setAttribute("name", "voiture")
    input.setAttribute("id", `voiture${i}`)
    h4.setAttribute("class", "car-name")
    h61.setAttribute("class", "car-statut")
    h41.setAttribute("class", "car-price")

    h6.textContent = voitures[i].categorie
    h4.textContent = voitures[i].marque + " " + voitures[i].modele
    h61.textContent = voitures[i].statut
    h41.textContent = voitures[i].prixJour + "MAD / jour"

    input.addEventListener("change", () => {
      carname.textContent = h4.textContent
      carcat.textContent = h6.textContent
      num = i
      calculprix(voitures[num].prixJour, duration)
      let choisis = document.querySelector('.choisis')
      if (choisis != null) {
        choisis.classList.remove("choisis")
      }
      div1.classList.add("choisis")
    })

    div2.append(h6, input)
    div1.append(div2, h4, h61, h41)
    label.append(div1)
    destination.append(label)
  }
}

function restart() {
  let choisis = document.querySelector('.choisis')
  form1.reset()
  choisis.classList.remove("choisis")
  carname.textContent = "Choisisez une vehicule"
  carcat.textContent = "categorie de vehicule"
  carprice.textContent = "prix"
  total.textContent = "total"
  period.textContent = "période de location"
  duree.textContent = "Duréede location"
}

resetbtn.addEventListener("click", () => {
  restart()
})

function datesetting() {
  if (start.value !== "" && end.value !== "" && recup !== null) {
    period.textContent = formatdate(start) + " → " + formatdate(end)
    locationperiod(start, end)
    duree.textContent = duration + " jours"
    calculprix(voitures[num].prixJour, duration)
  }
}

function formatdate(e) {
  const raw = e.value
  const [year, month, day] = raw.split("-")
  let formated = `${day}/${month}/${year}`
  console.log(formated);
  return formated
}

start.addEventListener("change", () => {
  datesetting()
  datenow()
  let mil = new Date(start.value).getTime()
  let newmil = mil + 172800000
  let actumil = new Date(newmil).toISOString().split("T")[0]
  end.setAttribute("min", `${actumil}`)
  end.value = null
})

end.addEventListener("change", () => {
  datesetting()
})

function locationperiod(debut, fin) {
  let timedebut = new Date(debut.value)
  let timefin = new Date(fin.value)
  let diff = Math.abs(timefin - timedebut)
  duration = Math.floor(diff / 86400000)
  console.log(duration)
  return duration++
}

function calculprix(a, b) {
  prix = a * b
  if (prix > 0 && recup != null) {
    carprice.textContent = prix + "MAD / jour"
    let totalprix = prix + recup
    total.textContent = totalprix + "MAD"
  }
}

function datenow() {
  let now = Date.now()
  let actualdate = new Date(now).toISOString().split('T')[0]
  start.setAttribute("min", `${actualdate}`)
  actual = actualdate
  return actualdate
}
datenow()

next1.addEventListener("click", () => {
  if (num == undefined || start.value == "" || end.value == "") {
    window.alert("please fill all fields")
  } else {
    etape1.setAttribute("hidden", "true")
    etape2.removeAttribute("hidden")
    stepnum1.classList.remove("curent-step-num")
    stepname1.classList.remove("curent-step-name")
    stepnum2.classList.add("curent-step-num")
    stepname2.classList.add("curent-step-name")
  }
})

let modesRecuperation = [
  { id: "agence", nom: "À l’agence", fraisFixes: 0 },
  { id: "aeroport", nom: "À l’aéroport", fraisFixes: 150 },
  { id: "adresse", nom: "À une adresse", fraisFixes: 100 },
]

let affichage2 = document.getElementById("affichage2")
let recupprice = document.getElementById("prix-recuperation")
let timeinput = document.getElementById("time-input")
let recupinput = document.getElementById("recup-input")
let agence = document.getElementById("agence")
let aeroport = document.getElementById("aeroport")
let adresse = document.getElementById("adresse")
let return1 = document.getElementById("return1")
let next2 = document.getElementById("next2")
let port = document.getElementById("port")
let vol = document.getElementById("vol")
let arival = document.getElementById("arival")
let city = document.getElementById("city")
let home = document.getElementById("home")
let delivery = document.getElementById("delivery")
let stepnum3 = document.getElementById("stepnum3")
let stepname3 = document.getElementById("stepname3")
let etape3 = document.getElementById("etape3")

let recup

function display2() {
  affichage2.textContent = ""
  for (let i = 0; i < modesRecuperation.length; i++) {
    let label1 = document.createElement("label")
    let div1 = document.createElement("div")
    let input1 = document.createElement("input")
    let p1 = document.createElement("p")
    let p2 = document.createElement("p")

    div1.setAttribute("class", "choix")
    div1.classList.add("smaller")
    input1.setAttribute("type", "radio")
    input1.setAttribute("name", "local")
    p1.setAttribute("class", "car-name")
    p2.setAttribute("class", "car-price")

    p1.textContent = modesRecuperation[i].nom
    p2.textContent = "+" + modesRecuperation[i].fraisFixes + "MAD"

    input1.addEventListener("change", () => {
      recupprice.textContent = modesRecuperation[i].fraisFixes + " MAD"
      recup = modesRecuperation[i].fraisFixes
      calculprix(voitures[num].prixJour, duration)
      let choisis = document.querySelector('.choisis1')
      if (choisis != null) {
        choisis.classList.remove("choisis1")
      }
      div1.classList.add("choisis1")
      if (recup == "0") {
        agence.removeAttribute("hidden")
        aeroport.setAttribute("hidden", "true")
        adresse.setAttribute("hidden", "true")
      } else if (recup == "150") {
        aeroport.removeAttribute("hidden")
        agence.setAttribute("hidden", "true")
        adresse.setAttribute("hidden", "true")
      } else if (recup == "100") {
        adresse.removeAttribute("hidden")
        aeroport.setAttribute("hidden", "true")
        agence.setAttribute("hidden", "true")
      }
    })
    div1.append(input1, p1, p2)
    label1.append(div1)
    affichage2.append(label1)
  }
}
display2()

return1.addEventListener("click", () => {
  etape2.setAttribute("hidden", "true")
  etape1.removeAttribute("hidden")
  stepnum2.classList.remove("curent-step-num")
  stepname2.classList.remove("curent-step-name")
  stepnum1.classList.add("curent-step-num")
  stepname1.classList.add("curent-step-name")
})
console.log(port.value)
next2.addEventListener("click", () => {
  if (recup == "0") {
    if (timeinput.value == "") {
      window.alert("please fill all fields")
    } else {
      etape2.setAttribute("hidden", "true")
      etape3.removeAttribute("hidden")
      stepnum2.classList.remove("curent-step-num")
      stepname2.classList.remove("curent-step-name")
      stepnum3.classList.add("curent-step-num")
      stepname3.classList.add("curent-step-name")
    }
  } else if (recup == "150") {
    if (port.value == "" || vol.value == "" || arival.value == "") {
      window.alert("please fill all fields")
    } else {
      etape2.setAttribute("hidden", "true")
      etape3.removeAttribute("hidden")
      stepnum2.classList.remove("curent-step-num")
      stepname2.classList.remove("curent-step-name")
      stepnum3.classList.add("curent-step-num")
      stepname3.classList.add("curent-step-name")
    }
  } else if (recup == "100") {
    if (city.value == "" || home.value == "" || delivery.value == "") {
      window.alert("please fill all fields")
    } else {
      etape2.setAttribute("hidden", "true")
      etape3.removeAttribute("hidden")
      stepnum2.classList.remove("curent-step-num")
      stepname2.classList.remove("curent-step-name")
      stepnum3.classList.add("curent-step-num")
      stepname3.classList.add("curent-step-name")
    }
  } else {
    window.alert("please fill all fields")
  }
})