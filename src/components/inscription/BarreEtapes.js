import React from 'react'
import { usePathname } from 'next/navigation'
import style from '@/styles/inscription/BarreEtapes.module.scss'

const BarreEtapes = ({ isMajeur }) => {
    const location = usePathname()

    const etapes = isMajeur
        ? ['Adhérent', 'État de santé', 'Cotisation', 'Fin']
        : ['Adhérent', 'Responsable', 'État de santé', 'Cotisation', 'Fin']

    const urlPath = location
    let currentStepIndex = 0

    if (urlPath === '/nouvel-adherent/responsable') {
        currentStepIndex = 1
    } else if (urlPath === '/nouvel-adherent/etat-sante') {
        currentStepIndex = 2
    } else if (urlPath === '/nouvel-adherent/cotisation') {
        currentStepIndex = isMajeur ? 2 : 3
    } else if (urlPath === '/nouvel-adherent/fin') {
        currentStepIndex = isMajeur ? 3 : 4
    }

    return (
        <div className={style.barreEtapes}>
            {etapes.map((etape, index) => {
                return (
                    <div
                        className={index < currentStepIndex ? style.etapeFaite :
                        index === currentStepIndex ? style.etapeEnCours :
                            style.etapeNonFaite}
                        key={etape}>
                        <span className={
                            index < currentStepIndex ? style.chiffreEtapeFaite :
                                index === currentStepIndex ? style.chiffreEtapeEnCours :
                                    style.chiffreEtapeNonFaite
                        }>
                          {index + 1}
                        </span>
                        <span className={
                            index < currentStepIndex ? style.texteEtapeFaite :
                                index === currentStepIndex ? style.texteEtapeEnCours :
                                    style.texteEtapeNonFaite
                        }>
                          {etape}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}

export default BarreEtapes
