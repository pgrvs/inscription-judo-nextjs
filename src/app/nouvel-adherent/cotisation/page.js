"use client"

import { useEffect, useState, useContext } from 'react'
import {useRouter} from 'next/navigation'

import {DataAdherentContext} from '@/contexts/DataAdherentProvider'

import { getCategorieLicence } from '@/API/RequetesAPI'
import { calculerAgeParAnnee } from "@/common/utils"
import style from "./FormulaireCotisation.module.scss"

import Navigation from "@/components/navigation/Navigation"
import ConfirmationModal from "@/components/modal/ConfiramtionModal"
import BarreEtapes from "@/components/inscription/BarreEtapes"
import ButtonSuivant from "@/components/buttonSuivant/ButtonSuivant"

const getDefaultCategory = (age, categories) => {
    if (age === 5) return categories.find((cat) => cat.label === 'Moustique')
    if (age >= 6 && age <= 7) return categories.find((cat) => cat.label === 'Mini-poussins')
    if (age >= 8 && age <= 9) return categories.find((cat) => cat.label === 'Poussins')
    if (age >= 10 && age <= 11) return categories.find((cat) => cat.label === 'Benjamins')
    if (age >= 12 && age <= 13) return categories.find((cat) => cat.label === 'Minimes')
    if (age >= 14 && age <= 16) return categories.find((cat) => cat.label === 'Cadets')
    if (age >= 17 && age <= 19) return categories.find((cat) => cat.label === 'Junior')
    if (age >= 20 && age <= 35) return categories.find((cat) => cat.label === 'Sénior')
    if (age >= 36) return categories.find((cat) => cat.label === 'Vétérans')
    return null
}

const FormulaireCotisation = () => {
    const { data, setData } = useContext(DataAdherentContext)
    const router = useRouter()

    const [categories, setCategories] = useState([]);
    const [selectedCategorie, setSelectedCategorie] = useState(null)
    const [paiement, setPaiement] = useState(data.cotisation.paiement ? data.cotisation.paiement : null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newCategory, setNewCategory] = useState(null)
    const [loading, setLoading] = useState(false)
    const [erreurs, setErreurs] = useState({
        categorie: '',
        paiement: ''
    })

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        setLoading(true)
        try {
            const results = await getCategorieLicence()
            setCategories(results)

            const age = calculerAgeParAnnee(data.adherent.dateDeNaissance)
            const defaultCategory = getDefaultCategory(age, results)
            setSelectedCategorie(defaultCategory)
        } catch (error) {
            console.error('Erreur lors de la recherche des catégories:', error)
        }
        setLoading(false)
    }

    const valider = () => {
        const erreurs = {}

        if (!selectedCategorie) {
            erreurs.categorie = 'La catégorie est obligatoire'
        }
        if (!paiement) {
            erreurs.paiement = 'La sélection du nombre de paiement est obligatoire'
        }

        setErreurs(erreurs)
        // Renvoie true si pas d'erreurs
        return Object.keys(erreurs).length === 0
    }

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value
        const category = categories.find((cat) => cat.id === categoryId)
        setNewCategory(category)
        setIsModalOpen(true)
        if (erreurs[e.target.name]) {
            // Efface l'erreur pour ce champ
            setErreurs({ ...erreurs, [e.target.name]: '' })
        }
    }

    const handleConfirmChange = () => {
        setSelectedCategorie(newCategory)
        setIsModalOpen(false)
    }

    const handleCancelChange = () => {
        setNewCategory(null)
        setIsModalOpen(false)
    }

    const handlePaiementChange = (e) => {
        setPaiement(parseInt(e.target.value, 10))
        if (erreurs[e.target.name]) {
            // Efface l'erreur pour ce champ
            setErreurs({ ...erreurs, [e.target.name]: '' })
        }
    }

    const handleClickSuivant = async (selectedCategorie, paiement) => {
        const cotisation ={
            'categorie' : selectedCategorie,
            'paiement' :paiement,
        }
        if (valider()) {
            setData(prevData => ({
                ...prevData,
                cotisation: cotisation,
            }))
            router.push(`/nouvel-adherent/fin`)
        }
    }

    const adherentName = `${data.adherent?.prenom ?? ''} ${data.adherent?.nom ?? ''}`
    const categoryLabel = newCategory?.label ?? ''

    return (
        <div>
            <Navigation
                partieActuelle={1}
                afficherPartie={1}
                lienVersPagePrecedente={'/nouvel-adherent/etat-sante'}
            />
            <div className="container">
                <BarreEtapes isMajeur={data.isAdherentMajeur}/>
                <div className={"encadrementPrincipal"}>
                    <div className={"containerForm"}>
                        { loading
                            ? <div className={"loader"}></div>
                            : <>
                                { categories === undefined ? (
                                        <p style={{marginBottom: '20px'}}>Impossible de charger les catégories, vérifier la connexion avec Dolibarr.</p>
                                    ) : (
                                        < div id = {style.idDivCategorie} >
                                        <label htmlFor="category">{adherentName} est dans la catégorie :</label>
                                        <select
                                            id="category"
                                            name="categorie"
                                            className={"selectCategorie"}
                                            onChange={handleCategoryChange}
                                            value={selectedCategorie ? selectedCategorie.id : ''}
                                        >
                                            <option value="">Sélectionner une catégorie</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.label}
                                                </option>
                                            ))}
                                        </select>
                                        </div>
                                    )
                                }
                                {erreurs.categorie && <span className={"erreur"}>{erreurs.categorie}</span>}

                                {selectedCategorie && (
                                    <>
                                        <div>
                                            <p className={style.pragrapheCotisation}>Montant de la cotisation
                                                : <span>{parseFloat(selectedCategorie.price).toFixed(2)}</span> €</p>
                                        </div>
                                        <label>Nombre de paiements :</label>
                                        <div className={style.divPaiement}>
                                            <div>
                                                <input type="radio" name="paiement" value="1" checked={paiement === 1}
                                                       onChange={handlePaiementChange}/>
                                                <label>1 fois</label>
                                            </div>
                                            <div>
                                                <input type="radio" name="paiement" value="2" checked={paiement === 2}
                                                       onChange={handlePaiementChange}/>
                                                <label>2 fois</label>
                                            </div>
                                            <div>
                                                <input type="radio" name="paiement" value="3" checked={paiement === 3}
                                                       onChange={handlePaiementChange}/>
                                                <label>3 fois</label>
                                            </div>

                                            {erreurs.paiement && <span className={"erreur"}>{erreurs.paiement}</span>}
                                        </div>
                                    </>
                                )}

                                <ButtonSuivant text={"Suivant"} onClick={() => handleClickSuivant(selectedCategorie, paiement)} />
                            </>
                        }
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onConfirm={handleConfirmChange}
                onClose={handleCancelChange}
                message={`Êtes-vous sûr de vouloir changer <span>${adherentName} </span>
                dans la catégorie <span>${categoryLabel}</span> ?`}
            />
        </div>
    )
}

export default FormulaireCotisation