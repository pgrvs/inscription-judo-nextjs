'use client'

import { useState, useEffect } from 'react'
import { getProviders, signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

import style from './Sigin.module.scss'
import Login from "@/assets/Login"

export default function SignIn() {
    const [providers, setProviders] = useState(null)
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders()
            setProviders(res)
        }
        fetchProviders()
    }, [])

    return (
        <div className={"container"}>
            <h1>Connexion</h1>
            <div className={"encadrementPrincipal"}>
                {providers ? Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <form className={"containerForm"}
                                  onSubmit={async (e) => {
                                      e.preventDefault()
                                      const email = e.target.email.value
                                      const password = e.target.password.value
                                      await signIn(provider.id, {
                                          email,
                                          password,
                                          callbackUrl: '/'
                                      })
                                  }}
                            >
                                <label htmlFor="email">Adresse email</label>
                                <input type="email" name="email" placeholder="Email" required/>
                                <label htmlFor="password">Mot de passe</label>
                                <input type="password" name="password" placeholder="Mot de passe" required/>
                                {error && <p className={style.erreur}>{error}</p>}
                                <button id={style.ajustementButton} className={"buttonNoir"} type="submit">
                                    <Login/>Se connecter</button>
                            </form>
                        </div>
                    )) :
                    <div className={"loader"}></div>
                }
            </div>
        </div>
    )
}