import { voituresInitiales } from "./data.js"

if (!localStorage.getItem("data")) {
    localStorage.setItem("data", JSON.stringify(voituresInitiales))
}
const liste = document.getElementById("liste-voitures")
const marque = document.getElementById("marque")
const modele = document.getElementById("modele")
const immatriculation = document.getElementById("immatriculation")
const categorie = document.getElementById("categorie")
const prix = document.getElementById("prix-jour")
const statut = document.getElementById("statut")
const btn = document.getElementById("bouton-enregistrer")
const searchbar = document.getElementById("recherche")
const filtrestatut = document.getElementById("filtre-statut")
const filtrecategorie = document.getElementById("filtre-categorie")
const triprix = document.getElementById("tri-prix")
const resetbut = document.getElementById("reinitialiser-filtres")
const cancel = document.getElementById("annuler-modification")

let tab = JSON.parse(localStorage.getItem("data"))
console.log(tab)

let bool = false
display(tab)
let id = tab.length + 1;
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
    localStorage.setItem("data", JSON.stringify(tab))

    id++
    marque.value = ""
    modele.value = ""
    immatriculation.value = ""
    prix.value = ""
    categorie.value = ""
    display(tab)
}

function display(arr) {
    liste.textContent = ""
    for (let i = 0; i < arr.length; i++) {

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
        const span3 = document.createElement("span")
        const td7 = document.createElement("td")
        const div = document.createElement("div")
        const btn1 = document.createElement("button")
        const btn2 = document.createElement("button")

        span1.setAttribute("class", "registration")
        td5.setAttribute("class", "price")

        if(arr[i].statut=="Disponible"){
            span3.setAttribute("class","badge badge-disponible")
        }else if(arr[i].statut=="Louée"){
            span3.setAttribute("class","badge badge-louee")
        }else if(arr[i].statut=="En maintenance"){
            span3.setAttribute("class","badge badge-maintenance")
        }

        div.setAttribute("class", "row-actions")
        btn1.setAttribute("class", "button button-edit")
        btn1.addEventListener("click", (e) => {
            e.preventDefault()
            modifycar(arr[i].id)
        })
        btn2.setAttribute("class", "button button-delete")
        btn2.addEventListener("click", (e) => {
            e.preventDefault()
            deletecar(arr[i].id)
        })

        strong.textContent = arr[i].marque
        td2.textContent = arr[i].modele
        span1.textContent = arr[i].immatriculation
        td4.textContent = arr[i].categorie
        span2.textContent = arr[i].prixJour +"DH / jour"
        span3.textContent = arr[i].statut
        btn1.textContent = "Modifier"
        btn2.textContent = "Supprimer"

        div.append(btn1, btn2)
        td7.append(div)
        td1.append(strong)
        td3.append(span1)
        td5.append(span2)
        td6.append(span3)
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
    if (bool === false) {
        addtolist()
        display(tab)

    } else if (bool === true) {
        savemodify(num)
        display(tab)
        bool = false
        cancel.setAttribute("hidden", "")
    }
    console.log(tab)

})

function deletecar(a) {
    for (let i = 0; i <= tab.length - 1; i++) {
        if (tab[i].id == a) {
            tab.splice(i, 1)
            display(tab)
            console.log(tab)
            localStorage.setItem("data", JSON.stringify(tab))
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
    cancel.removeAttribute("hidden")
    btn.textContent="Modifier voiture"
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

    localStorage.setItem("data", JSON.stringify(tab))
}

function cancelmodify(){
    marque.value = ""
    modele.value = ""
    immatriculation.value = ""
    prix.value = ""
    categorie.value = ""
    bool=false
}

cancel.addEventListener("click",cancelmodify
)

function precisedisplay() {
    let searchvalue = searchbar.value.toLowerCase().trim()
    let searchresult = tab.filter(item => item.marque.toLowerCase().includes(searchvalue)
        || item.modele.toLowerCase().includes(searchvalue)
        || item.immatriculation.toLowerCase().includes(searchvalue))

    if (filtrestatut.value != "") {
        searchresult = searchresult.filter(item => item.statut == filtrestatut.value)
    }

    if (filtrecategorie.value != "") {
        searchresult = searchresult.filter(item => item.categorie == filtrecategorie.value)
    }

    if (triprix.value == "") {
        display(searchresult)
    }

    let triresult = searchresult

    if (triprix.value == "croissant") {
        increasingly(triresult)
    }

    if (triprix.value == "decroissant") {
        decreasingly(triresult)
    }

    display(searchresult)
}

function reset() {
    searchbar.value = ""
    filtrecategorie.value = ""
    filtrestatut.value = ""
    searchbar.value = ""
    triprix.value = ""
    display(tab)
}

function decreasingly(arr) {
    for (let i = 0; i < arr.length-1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            let temp
            if (arr[i].prixJour < arr[j].prixJour) {
                temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
            }
        }
    }
    return arr
}

function increasingly(arr) {
    for (let i = 0; i < arr.length-1; i++) {
        for (let j = i + 1; j < arr.length ; j++) {
            let temp
            if (arr[i].prixJour > arr[j].prixJour) {
                temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
            }
        }
    }
    return arr
}

searchbar.addEventListener("input", precisedisplay)
filtrestatut.addEventListener("change", precisedisplay)
filtrecategorie.addEventListener("change", precisedisplay)
resetbut.addEventListener("click", reset)
triprix.addEventListener("change", precisedisplay)