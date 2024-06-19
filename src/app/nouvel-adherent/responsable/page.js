"use client"

import React, {useEffect, useState, useContext} from 'react'
import {useRouter} from 'next/navigation'
import Cleave from "cleave.js/react"

import {DataAdherentContext} from '@/contexts/DataAdherentProvider'

import {capitalize, validatePhoneNumber, validateEmail, validateCodePostal, isAdherentMajeur} from "@/common/utils"
import AjoutAdherent from "@/assets/AjoutAdherent"
import style from "./FormulaireResponsable.module.scss"

import Navigation from '@/components/navigation/Navigation'
import GestionnaireResponsables from "@/components/inscription/GestionnaireResponsables"
import BarreEtapes from "@/components/inscription/BarreEtapes"
import ButtonSuivant from '@/components/buttonSuivant/ButtonSuivant'

const FormulaireResponsable = () => {
    const { data, setData } = useContext(DataAdherentContext)
    const router = useRouter()

    const [indexResponsableActif, setIndexResponsableActif] = useState(0)
    const [partieAffichee, setPartieAffichee] = useState(1)
    const [responsables, setResponsables] = useState(data.responsables)
    const [erreurs, setErreurs] = useState({
        nom: '',
        prenom: '',
        rue: '',
        codePostal: '',
        ville: '',
        numeroTelephone1: '',
        numeroTelephone2: '',
        adresseEmail: '',
        responsable: ''
    })

    useEffect(() => {
        if(data.idAdherent){
            setResponsables(data.responsables)
        }
    }, [data.idAdherent, data.responsables])

    const ajouterResponsable = () => {
        const nouveauResponsable = {
            nom: '',
            prenom: '',
            rue: data.adherent.rue,
            codePostal: data.adherent.codePostal,
            ville: data.adherent.ville,
            numeroTelephone: ['', ''],
            adresseEmail: '',
            informations: {
                factures: false,
                legales: false,
                sportives: false,
            },
        }
        setResponsables([...responsables, nouveauResponsable])
        setIndexResponsableActif(responsables.length)
        setPartieAffichee(2)
    }

    const formGestionnaireResponsbale = (index) => {
        setIndexResponsableActif(index)
        setPartieAffichee(2)
    }

    const responsableActif = responsables[indexResponsableActif]

    const handleChange = (e) => {
        const { name, value, checked } = e.target
        const updatedResponsables = [...responsables]
        if (name.includes('factures') || name.includes('legales')  || name.includes('sportives') ) {
            updatedResponsables[indexResponsableActif].informations[name] = checked
        }
        else if (name.includes('numeroTelephone')) {
            const telephoneIndex = parseInt(name.split('_')[1])
            const numTelephoneSansEspace = value.replace(/ /g, "")
            updatedResponsables[indexResponsableActif].numeroTelephone[telephoneIndex] = numTelephoneSansEspace
        }
        else if (name.includes('codePostal')) {
            const codePostalSansEspace = value.replace(/ /g, "")
            updatedResponsables[indexResponsableActif].codePostal = codePostalSansEspace
        }
        else if (name.includes('prenom')) {
            updatedResponsables[indexResponsableActif].prenom = capitalize(e.target.value)
        }
        else if (name.includes('nom')) {
            updatedResponsables[indexResponsableActif].nom = e.target.value.toUpperCase()
        }
        else {
            updatedResponsables[indexResponsableActif][name] = value
        }
        setResponsables(updatedResponsables)
        if (erreurs[name]) {
            // Efface l'erreur pour ce champ si valide
            setErreurs({ ...erreurs, [name]: '' })
        }
    }

    const afficherPartie = (partie) => {
        if (partie < partieAffichee){
            setPartieAffichee(partie)
        } else if (validerPartie(partieAffichee)) {
            setPartieAffichee(partie)
        }
    }

    const handleSuivant = () => {
        if (validerPartie(1)){
            setData(prevData => ({
                ...prevData,
                responsables: responsables
            }))

            router.push(`/nouvel-adherent/etat-sante`)
        }
    }

    const validerPartie = (partie) => {
        const erreurs = {}

        if (partie === 1) {
            if(responsables.length < 1 || !responsables[0].nom){
                erreurs.responsable = 'Il faut avoir un responsable au minimun'
            }
        }

        if (partie === 2) {
            if (!responsableActif.nom) {
                erreurs.nom = 'Le nom est obligatoire'
            }
            if (!responsableActif.prenom) {
                erreurs.prenom = 'Le prénom est obligatoire'
            }
        }

        if (partie === 3) {
            if (!responsableActif.rue) {
                erreurs.rue = 'La rue est obligatoire'
            }
            const codePostalError = validateCodePostal(responsableActif.codePostal)
            if (codePostalError) {
                erreurs.codePostal = codePostalError
            }
            if (!responsableActif.ville) {
                erreurs.ville = 'La ville est obligatoire'
            }
        }

        if (partie === 4) {
            const numeroTelephoneError = validatePhoneNumber(responsableActif.numeroTelephone[0])
            if (numeroTelephoneError) {
                erreurs.numeroTelephone1 = numeroTelephoneError
            }
            if (responsableActif.numeroTelephone[1]) {
                if (!/[0-9]{10}/.test(responsableActif.numeroTelephone[1])) {
                    erreurs.numeroTelephone2 = 'Le numéro de téléphone doit être valide'
                }
            }
            const emailError = validateEmail(responsableActif.adresseEmail)
            if (emailError) {
                erreurs.adresseEmail = emailError
            }
        }
        setErreurs(erreurs)
        // Renvoie true si pas d'erreurs
        return Object.keys(erreurs).length === 0
    }

    return (
        <div>
            <Navigation
                partieActuelle={partieAffichee}
                afficherPartie={afficherPartie}
                lienVersPagePrecedente={'/nouvel-adherent/adherent'}
            />
            <div className="container">
                <div>
                    <BarreEtapes isMajeur={data.isAdherentMajeur}/>
                    <div className={"encadrementPrincipal"}>
                        {partieAffichee === 1 && (
                            <>
                                <h2>{data.responsables.length > 1 ? 'Responsables' : 'Responsable'} de {data.adherent.prenom} :</h2>

                                <GestionnaireResponsables responsables={responsables} indexResponsbale={formGestionnaireResponsbale}/>
                                {erreurs.responsable && <span className={"erreur"}>{erreurs.responsable}</span>}

                                <div className={style.buttonResponsable}>
                                    <button className={"buttonNoir"} onClick={ajouterResponsable}>
                                        <AjoutAdherent className={"iconeAjout"} alt="Ajout adherent"/>
                                        <p>Créer un nouveau responsable</p>
                                    </button>
                                    <button className={"buttonNoir"} type="button" onClick={handleSuivant}>
                                        <p>Passer à la suite</p>
                                    </button>
                                </div>
                            </>
                        )}
                        <div className={"containerForm"}>
                            {partieAffichee === 2 && (
                                <>
                                    <legend>Responsable n°{indexResponsableActif + 1}</legend>
                                    <label>Nom :</label>
                                    <input type="text" name="nom" value={responsableActif.nom} onChange={handleChange} placeholder={"Entrer le nom"}/>
                                    {erreurs.nom && <span className={"erreur"}>{erreurs.nom}</span>}
                                    <label>Prénom :</label>
                                    <input type="text" name="prenom" value={responsableActif.prenom} onChange={handleChange} placeholder={"Entrer le prénom"}/>
                                    {erreurs.prenom && <span className={"erreur"}>{erreurs.prenom}</span>}

                                    <ButtonSuivant text={"Suivant"} onClick={() => afficherPartie(3)} />
                                </>
                            )}

                            {partieAffichee === 3 && (
                                <>
                                    <label>Rue :</label>
                                    <input type="text" name="rue" value={responsableActif.rue} onChange={handleChange}/>
                                    {erreurs.rue && <span className={"erreur"}>{erreurs.rue}</span>}

                                    <label>Code Postal :</label>
                                    <Cleave
                                        placeholder="Entrer le code postal"
                                        options={{
                                            blocks: [2, 3],
                                            delimiter: " ",
                                        }}
                                        onChange={handleChange}
                                        className="form-field"
                                        name="codePostal"
                                        value={responsableActif.codePostal}
                                    />
                                    {erreurs.codePostal && <span className={"erreur"}>{erreurs.codePostal}</span>}

                                    <label>Ville :</label>
                                    <input type="text" name="ville" onChange={handleChange} value={responsableActif.ville}/>
                                    {erreurs.ville && <span className={"erreur"}>{erreurs.ville}</span>}

                                    <ButtonSuivant text={"Suivant"} onClick={() => afficherPartie(4)} />
                                </>
                            )}

                            {partieAffichee === 4 && (
                                <>
                                    <label>Téléphone 1 :</label>
                                    <Cleave
                                        placeholder="06 00 00 00 00"
                                        options={{
                                            blocks: [2, 2, 2, 2, 2],
                                            delimiter: " ",
                                        }}
                                        onChange={handleChange}
                                        className="form-field"
                                        name="numeroTelephone_0"
                                        value={responsableActif.numeroTelephone[0]}
                                    />
                                    {erreurs.numeroTelephone1 && <span className={"erreur"}>{erreurs.numeroTelephone1}</span>}

                                    <label>Téléphone 2 :</label>
                                    <Cleave
                                        placeholder="Facultatif"
                                        options={{
                                            blocks: [2, 2, 2, 2, 2],
                                            delimiter: " ",
                                        }}
                                        onChange={handleChange}
                                        className="form-field"
                                        name="numeroTelephone_1"
                                        value={responsableActif.numeroTelephone[1]}
                                    />
                                    {erreurs.numeroTelephone2 && <span className={"erreur"}>{erreurs.numeroTelephone2}</span>}
                                    <label>Adresse email :</label>
                                    <input type="email" name="adresseEmail" value={responsableActif.adresseEmail} onChange={handleChange} placeholder={"exemple@email.com"}/>
                                    {erreurs.adresseEmail && <span className={"erreur"}>{erreurs.adresseEmail}</span>}

                                    <ButtonSuivant text={"Suivant"} onClick={() => afficherPartie(5)} />
                                </>
                            )}

                            {partieAffichee === 5 && (
                                <>
                                    <legend>Informations à envoyer par email :</legend>
                                    <div className={style.divCheckbox}>
                                        <input type="checkbox" name="factures"
                                               checked={responsableActif.informations.factures}
                                               onChange={handleChange}/>
                                        <label>Factures</label>
                                    </div>
                                    <div className={style.divCheckbox}>
                                        <input type="checkbox" name="legales"
                                               checked={responsableActif.informations.legales} onChange={handleChange}/>
                                        <label>Informations légales</label>
                                    </div>
                                    <div className={style.divCheckbox}>
                                        <input type="checkbox" name="sportives"
                                               checked={responsableActif.informations.sportives}
                                               onChange={handleChange}/>
                                        <label>Informations sportives</label>
                                    </div>

                                    <ButtonSuivant text={"Suivant"} onClick={() => afficherPartie(1)} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormulaireResponsable