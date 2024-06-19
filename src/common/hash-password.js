(async () => {
    const { genSaltSync, hashSync } = await import('bcrypt-ts/node')

    const motDePasse = "NouveauMotDePasse"

    const salt = genSaltSync(10)
    const hash = hashSync(motDePasse, salt)

    console.log("Mot de passe hashé : ", hash)
})()

