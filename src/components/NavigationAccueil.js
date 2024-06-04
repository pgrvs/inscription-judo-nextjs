"use client"

import { useRouter } from "next/navigation"

import RetourAccueil from "@/assets/RetourAccueil"
import style from '@/styles/NavigationAccueil.module.scss'

const NavigationAccueil = () => {
    const router = useRouter()

    const handleHome = () => {
        router.push('/')
    }

    return (
        <button className={`buttonRetour ${style.accueil}`} onClick={handleHome}>
            <RetourAccueil width="27" height="27"/>
        </button>
    )
}

export default NavigationAccueil