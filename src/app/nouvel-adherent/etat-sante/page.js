"use client"

import {useState, useEffect, useContext} from "react"
import {useRouter} from 'next/navigation'

import Navigation from "@/components/Navigation"
import Message from "@/components/Message"
import BarreEtapes from "@/components/inscription/BarreEtapes"
import ButtonSuivant from "@/components/ButtonSuivant"

import { RouteContext } from '@/contexts/RouteProvider'
import {DataAdherentContext} from '@/contexts/DataAdherentProvider'

import style from "./FormulaireEtatSante.module.scss"

const FormulaireEtatSante = () => {
    const { data, setData } = useContext(DataAdherentContext)
    const router = useRouter()

    const [partieAffichee, setPartieAffichee] = useState(1)
    const [etatSante, setEtatSante] = useState(false)
    const previousRoute = useContext(RouteContext)

    useEffect(() => {
        if (previousRoute === '/nouvel-adherent/cotisation') {
            setPartieAffichee(3)
        }
    }, [previousRoute])

    const afficherPartie = (partie) => {
        setPartieAffichee(partie)
    }

    const reponseQuestionnaireMedicale = (formEtatSante) => {
        setEtatSante(formEtatSante)
        setPartieAffichee(3)
    }

    const handleSuivant = () => {
        setData(prevData => ({
            ...prevData,
            etatSante: etatSante,
        }))

        router.push(`/nouvel-adherent/cotisation`)
    }

    return (
        <div>
            {data.isAdherentMajeur ?
                <Navigation
                    partieActuelle={partieAffichee}
                    afficherPartie={afficherPartie}
                    lienVersPagePrecedente={'/nouvel-adherent/adherent'}
                />
                :
                <Navigation
                    partieActuelle={partieAffichee}
                    afficherPartie={afficherPartie}
                    lienVersPagePrecedente={'/nouvel-adherent/responsable'}
                />
            }
            <div className="container">
                <BarreEtapes isMajeur={data.isAdherentMajeur}/>
                {partieAffichee === 1 && (
                    <div>
                        <Message
                            message={'Donner le questionnaire de santé'}
                            image={'questionnaire_medical'}/>
                        <ButtonSuivant text={"Suivant"} onClick={() => afficherPartie(2)} />
                    </div>
                )}
                {partieAffichee === 2 && (
                    <div className={"encadrementPrincipal"}>
                        <div className={style.divButtonEtatSante}>
                            <button className={style.buttonNon}type="button" onClick={() => reponseQuestionnaireMedicale(false)}>
                                L'adhérent a répondu <br/><span>non</span> à toutes les questions <br/>du formulaire
                            </button>
                            <button className={style.buttonOui} type="button" onClick={() => reponseQuestionnaireMedicale(true)}>
                                L'adhérent a répondu <br/><span>oui</span> à une ou plusieurs <br/>questions du formulaire
                            </button>
                        </div>
                    </div>
                )}
                {partieAffichee === 3 && (
                    <div>
                        {etatSante ?
                            <Message
                                message={'L’adhérent a <span>besoin</span> d’un <span>certificat médical</span>, à remettre avant la première séance.'}
                                image={'certificat_medical'}/>
                            :
                            <Message
                                message={'L’adhérent n\'a besoin d’<span>aucun certificat médical</span>, à remettre avant la première séance.'}
                                image={'certificat_medical_barre'}/>
                        }
                        <ButtonSuivant text={"Suivant"} onClick={() => handleSuivant()} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default FormulaireEtatSante