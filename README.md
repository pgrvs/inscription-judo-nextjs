This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Documentation d’installation - Judo inscription

## Prérequis

- Version de Dolibarr égale ou supérieure à la 18.

## Ajout des modules

- API REST
- Tiers
- Produits/Services
- Facturation
- Documents

## Ajout des champs supplémentaires

### Tiers

| Position | Libellé                   | Code de l'attribut      | Type                          | Taille | Valeur                |
|----------|---------------------------|-------------------------|-------------------------------|--------|-----------------------|
| 100      | Date de naissance         | datedenaissance         | Date                          | -      | -                     |
| 101      | Genre                     | genre                   | Radio bouton (choix unique)   | -      | 1 M, 2 F              |
| 102      | Poids en Kilogramme       | poidsenkilogramme       | Décimal                       | -      | 242                   |
| 103      | Catégorie                 | categorie               | Liste de sélection            | -      | 1 Moustique, 2 Mini-poussins, 3 Poussins, 4 Benjamins, 5 Minimes, 6 Cadets, 7 Junior, 8 Sénior, 9 Vétérans, 10 Handi Judo |
| 104      | Couleur de la ceinture    | couleurdelaceinture     | Chaine de caractères (1 ligne)| 255    | -                     |
| 105      | Numéro de licence         | numroadhrent            | Chaine de caractères (1 ligne)| 255    | -                     |
| 106      | Date d'inscription        | datedinscription        | Date                          | -      | -                     |
| 107      | Dernière année licenciée  | derniereanneelicenciee  | Chaine de caractères (1 ligne)| 255    | -                     |
| 108      | Certificat médical        | certificatmdicale       | Radio bouton (choix unique)   | -      | -                     |
| 109      | Droit à l'image           | droitimage              | Boolean (case à cocher unique)| -      | -                     |

- Unique : non
- Obligatoire : non
- Peut toujours être édité : oui
- Visibilité : 1
- Sur les PDF : 0

### Information

Dernière année licenciée est calculée sur la date en cours si la date est avant juin (année-1 – année) sinon si elle est en juin ou après (année – année+1)


### Contacts/adresses

| Position | Libellé          | Code de l'attribut | Type         | Taille | Valeur                           |
|----------|------------------|--------------------|--------------|--------|----------------------------------|
| 100      | Recevoir par mai | recevoirparmail    | Cases à cocher | -    | 1 factures, 2 informations légales, 3 informations sportives |

- Unique : non
- Obligatoire : non
- Peut toujours être édité : oui
- Visibilité : 1
- Sur les PDF : 0

### Factures

| Position | Libellé           | Code de l'attribut  | Type         | Taille | Valeur                |
|----------|-------------------|---------------------|--------------|--------|-----------------------|
| 100      | Combien de paiement | combiendepaiement  | Radio bouton (choix unique) | -    | 1 1 fois, 2 2 fois, 3 3 fois |

- Unique : non
- Obligatoire : non
- Peut toujours être édité : oui
- Visibilité : 1
- Sur les PDF : 0

## Ajout des tags

### Tiers

- « adhérent »

### Services

- « Licence »

## Ajout des licences

| Libellé       | Prix de vente | Tags   | Description                            |
|---------------|---------------|--------|----------------------------------------|
| Moustique     | 160 TTC tax 0%| Licence| Licence Judo - catégorie : Moustique   |
| Mini-poussins | 200 TTC tax 0%| Licence| Licence Judo - catégorie : Mini-poussins|
| Poussins      | 200 TTC tax 0%| Licence| Licence Judo - catégorie : Poussins    |
| Benjamins     | 200 TTC tax 0%| Licence| Licence Judo - catégorie : Benjamins   |
| Minimes       | 200 TTC tax 0%| Licence| Licence Judo - catégorie : Minimes     |
| Cadets        | 200 TTC tax 0%| Licence| Licence Judo - catégorie : Cadets      |
| Junior        | 200 TTC tax 0%| Licence| Licence Judo - catégorie : Junior      |
| Sénior        | 200 TTC tax 0%| Licence| Licence Judo - catégorie : Sénior      |
| Vétérans      | 200 TTC tax 0%| Licence| Licence Judo - catégorie : Vétérans    |
| Handi Judo    | 160 TTC tax 0%| Licence| Licence Judo - catégorie : Handi Judo  |

## Ajout des documents

Attention ne pas modifier les noms :
- Créer un dossier « Documents_a_envoyer » dans l’arborescence manuelle du module Documents.
- Ajouter « Attestation-QS-sport.pdf »
- Ajouter « Attestation-relative-etat-de-sante-du-sportif-mineur.pdf »
- Ajouter « Horaires.pdf »
- Ajouter « Regles-autours-du-certificat-medical-et-des-attestations-sur-honneur.pdf »

## Ajout des variables d’environnements

- Créer un fichier .env.local
- Créer un mot de passe hashé grâce au fichier src/common/hash-password.js
- Ajouter les variables suivantes :

```plaintext
API_KEY_DOLIBARR=
API_URL_DOLIBARR= 
HOST_SMTP=
PORT_SMTP=
USER_SMTP=
PASSWORD_SMTP=
#Obtenir un secret grâce à « openssl rand -base64 32 »
NEXTAUTH_SECRET= 
NEXTAUTH_URL= 
USER_EMAIL= 
#Utiliser le fichier src/common/hash-password.js pour hasher votre mot de passe
#Utiliser des caractères d'échappement devant $ => \$
USER_PASSWORD= 
#NEXT_PUBLIC_DEV_TEST_FACTURE_BROUILLON=false
NEXT_PUBLIC_DEV_TEST_FACTURE_BROUILLON=true
NEXT_PUBLIC_ID_TAG_ADHERENT=
NEXT_PUBLIC_ID_TAG_LICENCE=
```


## Information sur l’affectation d’une licence selon l’âge de l’adhérent

- Si l’âge est de 5ans  => 'Moustique'
- Entre 6 ans et 7 ans  => 'Mini-poussins'
- Entre 8 ans et 9 ans  => 'Poussins'
- Entre 10 ans et 11 ans => 'Benjamins'
- Entre 12 ans et 14 ans => 'Minimes'
- Entre 15 ans et 17 ans => 'Cadets'
- Entre 18 ans et 20 ans => 'Junior'
- Entre 21 ans et 34 ans => 'Sénior'
- Au-dessus de 34 ans => 'Vétérans'
