"use client"

import { useRouter } from 'next/navigation'
import NavigationAccueil from "@/components/NavigationAccueil"
import FlecheRetour from "@/assets/FlecheRetour"
import style from '@/styles/Navigation.module.scss'

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
        <>
            <NavigationAccueil/>
            <button className={`buttonRetour ${style.flecheRetour}`} onClick={handleRetour}>
                <FlecheRetour width="27" height="27"/>
            </button>
        </>
    )
}

export default Navigation
