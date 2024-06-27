import imageCompression from "browser-image-compression"

const splitName = (fullName) => {
    const words = fullName.trim().split(' ')

    let prenom = ''
    let nom = ''

    words.forEach((word) => {
        if (word === word.toUpperCase()) {
            if (nom) {
                nom += ' ' + word
            } else {
                nom = word
            }
        } else {
            if (prenom) {
                prenom += ' ' + word
            } else {
                prenom = word
            }
        }
    })
    return { prenom, nom }
}


const convertTimestampToDate = (timestamp) => {
    if (timestamp) {
        const date = new Date(timestamp * 1000)
        return date.toISOString().split('T')[0]
    }
}

const capitalize = (string) => {
    if (!string || typeof string !== 'string') {
        return '' // Gérer les cas où l'entrée n'est pas une chaîne ou est vide
    }

    return string
        .split(' ') // Divise la chaîne en mots
        .map((word) => {
            if (word) {
                // Prendre la première lettre et la capitaliser, puis ajouter le reste du mot
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            }
            return '' // Gérer les cas où il y a des espaces supplémentaires
        })
        .join(' ') // Rejoindre les mots capitalisés en une seule chaîne
}

const isAdherentMajeur = (dateDeNaissance) => {
    if (dateDeNaissance) {
        const dateNaissance = new Date(dateDeNaissance)
        const today = new Date()
        const age = today.getFullYear() - dateNaissance.getFullYear()
        return age >= 18
    }
    return false
}

const calculerAgeParAnnee = (birthDate) => {
    const date = new Date()
    const dateBirth = new Date(birthDate)
    return date.getFullYear() - dateBirth.getFullYear()
}

const informationsRecevoirParMailToString = (informations) => {
    if (!informations || typeof informations !== 'object') {
        return '' // Gérer les cas où l'entrée n'est pas un objet ou est vide
    }

    // Obtenir les clés et valeurs de l'objet
    const entries = Object.entries(informations)

    // Filtrer pour ne garder que les paires où la valeur est 'true'
    const trueEntries = entries
        .map(([key, value], index) => (value ? index + 1 : null))
        .filter((index) => index !== null)

    // Transformer les indices en chaîne de caractères séparée par des virgules
    return trueEntries.join(',')
}

const informationsRecevoirParMailToObject = (indices) => {
    if (indices === null || indices === undefined){
        return {
            factures: false,
            legales: false,
            sportives: false
        }
    }

    const keys = ['factures', 'legales', 'sportives']
    const informations = {}

    indices.split(',').forEach(indexStr => {
        // Convertir l'indice en nombre
        const index = parseInt(indexStr.trim(), 10)
        // Vérifier si l'indice est valide
        if (index >= 1 && index <= keys.length) {
            // Récupérer la clé correspondant à l'indice et définir sa valeur sur true
            informations[keys[index - 1]] = true
        }
    })

    // Remplir les clés manquantes avec des valeurs false
    keys.forEach(key => {
        if (!(key in informations)) {
            informations[key] = false
        }
    })

    return informations
}

const calculeAnneeLicenciee = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()

    if (month < 5 ) {
        return (year-1) + '-' + (year)
    }
    return year + '-' + (year+1)
}

const categoryForDolibarr = (categorieLabel) => {
    switch (categorieLabel) {
        case ('Moustique') :
            return '1'
        case ('Mini-poussins') :
            return '2'
        case ('Poussins') :
            return '3'
        case ('Benjamins') :
            return '4'
        case ('Minimes') :
            return '5'
        case ('Cadets') :
            return '6'
        case ('Junior') :
            return '7'
        case ('Sénior') :
            return '8'
        case ('Vétérans') :
            return '9'
        case ('Handi Judo') :
            return '10'
        case ('Ceinture noire'):
            return '11'
        case ('Quartier') :
            return '12'
        case ('Self Défense') :
            return '13'
        case ('Féminin') :
            return '14'
        case ('Taïso') :
            return '15'
        default:
            return null
    }
}

const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) {
        return 'Le numéro de téléphone est obligatoire'
    }
    if (!/^[0-9]{10}$/.test(phoneNumber)) {
        return 'Le numéro de téléphone doit contenir 10 chiffres'
    }
    return ''
}

const validateEmail = (email) => {
    if (!email) {
        return 'L\'adresse e-mail est obligatoire'
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return 'L\'adresse e-mail doit être valide'
    }
    return ''
}

const validateCodePostal = (codePostal) => {
    if (!codePostal) {
        return 'Le code postal est obligatoire'
    }
    if (!/[0-9]{5}/.test(codePostal)) {
        return 'Le code postal doit être valide'
    }
    return ''
}


const base64ToBlob = (base64, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
}

const compressBase64Image = async (base64Image, maxSizeMB, maxWidthOrHeight) => {
    const blob = base64ToBlob(base64Image, 'image/jpeg')
    const compressionOptions = {
        maxSizeMB,
        useWebWorker: true,
    }

    if (maxWidthOrHeight) {
        compressionOptions.maxWidthOrHeight = maxWidthOrHeight
    }

    const compressedBlob = await imageCompression(blob, compressionOptions)
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            resolve(reader.result.split(',')[1])
        }
        reader.onerror = reject
        reader.readAsDataURL(compressedBlob)
    })
}

export {
    splitName,
    convertTimestampToDate,
    capitalize,
    isAdherentMajeur,
    calculerAgeParAnnee,
    informationsRecevoirParMailToString,
    informationsRecevoirParMailToObject,
    calculeAnneeLicenciee,
    categoryForDolibarr,
    validatePhoneNumber,
    validateEmail,
    validateCodePostal,
    compressBase64Image
}