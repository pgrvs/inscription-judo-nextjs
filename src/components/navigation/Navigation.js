"use client"

import { useRouter } from 'next/navigation'

import FlecheRetour from "@/assets/FlecheRetour"
import style from './Navigation.module.scss'

import NavigationAccueil from "@/components/navigation/NavigationAccueil"

const Navigation = ({ partieActuelle, afficherPartie, lienVersPagePrecedente }) => {
    const router = useRouter()

    const handleRetour = () => {
        if (partieActuelle === 1) {
            router.push(lienVersPagePrecedente)
        } else {
            afficherPartie(partieActuelle - 1)
        }
    }

    return (
        <div>
            <NavigationAccueil/>
            <button className={`buttonRetour ${style.flecheRetour}`} onClick={handleRetour}>
                <FlecheRetour width="27" height="27"/>
            </button>
        </div>
    )
}

export default Navigation
