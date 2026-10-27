import { voituresInitiales } from "./data.js"
let tab = voituresInitiales
const liste = document.getElementById("liste-voitures")
const marque = document.getElementById("marque")
const modele = document.getElementById("modele")
const immatriculation = document.getElementById("immatriculation")
const categorie = document.getElementById("categorie")
const prix = document.getElementById("prix-jour")
const statut = document.getElementById("statut")
const btn = document.getElementById("bouton-enregistrer")

let bool = false
display()
let id = 7
function addtolist() {
    let temp = {
        "id": id,
        "marque": marque.value,
        "modele": modele.value,
        "immatriculation": immatriculation.value,
        "categorie": categorie.value,
        "prixJour": prix.value,
        "statut": statut.value
    }

    tab.push(temp)
    console.log(tab)
    temp = {}

    id++
    marque.value = ""
    modele.value = ""
    immatriculation.value = ""
    prix.value = ""
    display()
}

function display() {
    liste.textContent = ""
    for (let i = 0; i < tab.length; i++) {

        const tr = document.createElement("tr")
        const td1 = document.createElement("td")
        const strong = document.createElement("strong")
        const td2 = document.createElement("td")
        const td3 = document.createElement("td")
        const span1 = document.createElement("span")
        const td4 = document.createElement("td")
        const td5 = document.createElement("td")
        const span2 = document.createElement("span")
        const td6 = document.createElement("td")
        const td7 = document.createElement("td")
        const div = document.createElement("div")
        const btn1 = document.createElement("button")
        const btn2 = document.createElement("button")

        span1.setAttribute("class", "registration")
        td5.setAttribute("class", "price")
        span2.setAttribute("class", "badge badge-disponible")
        div.setAttribute("class", "row-actions")
        btn1.setAttribute("class", "button button-edit")
        btn1.addEventListener("click", (e) => {
            e.preventDefault()
            modifycar(tab[i].id)
        })
        btn2.setAttribute("class", "button button-delete")
        btn2.addEventListener("click", (e) => {
            e.preventDefault()
            deletecar(tab[i].id)
        })

        strong.textContent = tab[i].marque
        td2.textContent = tab[i].modele
        span1.textContent = tab[i].immatriculation
        td4.textContent = tab[i].categorie
        span2.textContent = tab[i].prixJour
        td6.textContent = tab[i].statut
        btn1.textContent = "Modifier"
        btn2.textContent = "Supprimer"

        div.append(btn1, btn2)
        td7.append(div)
        td1.append(strong)
        td3.append(span1)
        td5.append(span2)
        tr.append(td1, td2, td3, td4, td5, td6, td7)
        liste.append(tr)

    }
}

btn.addEventListener("click", (e) => {
    e.preventDefault()
    if (marque.value == "" || modele.value == "" || immatriculation.value == "" || prix.value == "") {
        window.alert("please fill the required field");
        return;
    }
    if (bool == false) {
        addtolist()
        display()

    } else if (bool == true) {
        savemodify(num)
        display()
        bool = false
    }
    console.log(tab)

})

function deletecar(a) {
    for (let i = 0; i <= tab.length - 1; i++) {
        if (tab[i].id == a) {
            tab.splice(i, 1)
            display()
            console.log(tab)
        }

    }
}

let num
function modifycar(b) {
    bool = true
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].id == b) {
            marque.value = tab[i].marque
            modele.value = tab[i].modele
            immatriculation.value = tab[i].immatriculation
            categorie.value = tab[i].categorie
            prix.value = tab[i].prixJour
            statut.value = tab[i].statut
            num = i
        }

    }
}

function savemodify(c) {
    tab[c].marque = marque.value
    tab[c].modele = modele.value
    tab[c].immatriculation = immatriculation.value
    tab[c].categorie = categorie.value
    tab[c].prixJour = prix.value
    tab[c].statut = statut.value

    marque.value = ""
    modele.value = ""
    immatriculation.value = ""
    prix.value = ""
}