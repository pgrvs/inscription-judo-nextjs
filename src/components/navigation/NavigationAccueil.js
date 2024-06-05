"use client"

import { useRouter } from "next/navigation"

import RetourAccueil from "@/assets/RetourAccueil"
import style from './NavigationAccueil.module.scss'

const NavigationAccueil = () => {
    const router = useRouter()

    const handleHome = () => {
        router.push('/')
    }

    return (
        <div>
            <button className={`buttonRetour ${style.accueil}`} onClick={handleHome}>
                <RetourAccueil width="27" height="27"/>
            </button>
        </div>
    )
}

export default NavigationAccueil