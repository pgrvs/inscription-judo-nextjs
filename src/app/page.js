"use client"

import Link from 'next/link'

import AjoutAdherent from "@/assets/AjoutAdherent"
import VerifierCertificatsMedicaux from "@/assets/VerifierCertificatsMedicaux"

import style from "@/styles/Accueil.module.scss"

export default function Accueil() {
  return (
      <div className={"container"}>
          <div>
              <h1>Bienvenue</h1>
              <div className={style.navigationAccueil}>
                  <Link href="nouvel-adherent">
                      <button className={style.buttonAccueil}>
                          <AjoutAdherent className={`${style.image} ${style.imageTropaDroite}`} width="50"
                                         height="50"/>
                          <p className={style.textAccueil}>Nouvelle<br/>inscription<br/></p>
                      </button>
                  </Link>
                  <Link href="verification-certificats-medicals">
                      <button className={style.buttonAccueil}>
                          <VerifierCertificatsMedicaux className={style.image} width="50" height="50"/>
                          <p className={style.textAccueil}>Vérification<br/>certificats<br/>médicaux</p>
                      </button>
                  </Link>
              </div>
          </div>
      </div>
  )
}
