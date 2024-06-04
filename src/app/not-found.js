"use client"

import React from "react"
import { useRouter } from 'next/navigation'
import RetourAccueil from "@/assets/RetourAccueil"
import style from "../styles/NotFound.module.scss"

const PageNotFound = () => {
    const router = useRouter()

    const handleHome = () => {
        router.push('/')
    }

    return(
        <div className={style.divPageNotFound}>
            <h2>La page que vous cherchez n'existe pas ...</h2>
            <button className={style.retourAccueil} onClick={handleHome}>
                <RetourAccueil width="27" height="27"/>
                <p>Retourne à l'accueil</p>
            </button>
        </div>
    )
}

export default PageNotFound