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

Voici un fichier `README.md` basé sur le document PDF que vous avez fourni. Ce fichier est structuré pour offrir une vue d'ensemble claire de l'installation et de la configuration nécessaires pour l'inscription au Judo.

# Documentation d'Installation - Judo Inscription

## Table des matières
1. [Prérequis](#prérequis)
2. [Information sur l’affectation d’une licence selon l’âge de l’adhérent](#information-sur-laffectation-dune-licence-selon-lâge-de-ladhérent)
3. [Ajout des variables d’environnement](#ajout-des-variables-denvironnement)
4. [Ajout des modules](#ajout-des-modules)
5. [Ajout des champs supplémentaires](#ajout-des-champs-supplémentaires)
6. [Ajout des licences](#ajout-des-licences)
7. [Ajout des documents](#ajout-des-documents)

## Prérequis
- Version de Dolibarr égale ou supérieure à la 18.

## Information sur l’affectation d’une licence selon l’âge de l’adhérent
- 5 ans : 'Moustique'
- 6-7 ans : 'Mini-poussins'
- 8-9 ans : 'Poussins'
- 10-11 ans : 'Benjamins'
- 12-13 ans : 'Minimes'
- 14-16 ans : 'Cadets'
- 17-19 ans : 'Junior'
- 20-35 ans : 'Sénior'
- Au-dessus de 35 ans : 'Vétérans'

## Ajout des variables d’environnement
1. Créer un fichier `.env.local`
2. Créer un mot de passe hashé avec `src/common/hash-password.js`
3. Ajouter les variables suivantes :

```env
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
NEXT_PUBLIC_DEV_TEST_FACTURE_BROUILLON=false
#NEXT_PUBLIC_DEV_TEST_FACTURE_BROUILLON=true
NEXT_PUBLIC_ID_TAG_ADHERENT=
NEXT_PUBLIC_ID_TAG_LICENCE=
```

## Ajout des modules
- API REST
- Tiers
- Produits/Services
- Facturation
- Documents

## Ajout des champs supplémentaires

### Tiers
| Position | Libellé | Code de l'attribut | Type | Taille | Valeur                                                                                                                                                                                                                                                                                |
|----------|---------|---------------------|------|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 100 | Date de naissance | datedenaissance | Date |  |                                                                                                                                                                                                                                                                                       |
| 101 | Genre | genre | Radio bouton (choix unique) |  | 1, M <br/> 2, F                                                                                                                                                                                                                                                                       |
| 102 | Poids en Kilogramme | poidsenkilogramme | Décimal | 24,2 |                                                                                                                                                                                                                                                                                       |
| 103 | Catégorie | categorie | Liste de sélection |  | 1, Moustique <br/> 2, Mini-poussins <br/> 3, Poussins <br/> 4, Benjamins <br/> 5, Minimes <br/> 6, Cadets <br/> 7, Junior <br/> 8, Sénior <br/> 9, Vétérans <br/> 10, Handi Judo <br/> 11, Ceinture noire <br/> 12, Quartier <br/> 13, Self Défense <br/> 14, Féminin <br/> 15, Taïso |
| 104 | Couleur de la ceinture | couleurdelaceinture | Chaine de caractères (1 ligne) | 255 |                                                                                                                                                                                                                                                                                       |
| 105 | Numéro de licence | numroadhrent | Chaine de caractères (1 ligne) | 255 |                                                                                                                                                                                                                                                                                       |
| 106 | Date d'inscription | datedinscription | Date |  |                                                                                                                                                                                                                                                                                       |
| 107 | Dernière année licenciée | derniereanneelicenciee | Chaine de caractères (1 ligne) | 255 |                                                                                                                                                                                                                                                                                       |
| 108 | Certificat médical | certificatmdicale | Radio bouton (choix unique) |  | 1, pas besoin  <br/> 2, en attente <br/> 3, valide                                                                                                                                                                                                                                    |
| 109 | Droit à l'image | droitimage | Boolean (case à cocher unique) |  |                                                                                                                                                                                                                                                                                       |

### Contacts/adresses
| Position | Libellé | Code de l'attribut | Type | Taille | Valeur |
|----------|---------|---------------------|------|--------|--------|
| 100 | Recevoir par mail | recevoirparmail | Cases à cocher |  | 1, factures <br/> 2, informations légales <br/> 3, informations sportives |

### Factures
| Position | Libellé | Code de l'attribut | Type | Taille | Valeur |
|----------|---------|---------------------|------|--------|--------|
| 100 | Combien de paiement | combiendepaiement | Radio bouton (choix unique) |  | 1, 1 fois <br/> 2, 2 fois <br/> 3, 3 fois |

## Ajout des tags
- Tiers : « adhérent »
- Services : « Licence »

## Ajout des licences
| Libellé | Prix de vente | Tags | Description |
|---------|---------------|------|-------------|
| Moustique | 160 TTC taxe 0% | Licence | Licence Judo - catégorie : Moustique |
| Mini-poussins | 200 TTC taxe 0% | Licence | Licence Judo - catégorie : Mini-poussins |
| Poussins | 200 TTC taxe 0% | Licence | Licence Judo - catégorie : Poussins |
| Benjamins | 200 TTC taxe 0% | Licence | Licence Judo - catégorie : Benjamins |
| Minimes | 200 TTC taxe 0% | Licence | Licence Judo - catégorie : Minimes |
| Cadets | 200 TTC taxe 0% | Licence | Licence Judo - catégorie : Cadets |
| Junior | 200 TTC taxe 0% | Licence | Licence Judo - catégorie : Junior |
| Sénior | 200 TTC taxe 0% | Licence | Licence Judo - catégorie : Sénior |
| Vétérans | 200 TTC taxe 0% | Licence | Licence Judo - catégorie : Vétérans |
| Handi Judo | 160 TTC taxe 0% | Licence | Licence Judo - catégorie : Handi Judo |
| Ceinture noire | 41 TTC taxe 0% | Licence | Licence Judo - catégorie : Ceinture noire |
| Quartier | 130 TTC taxe 0% | Licence | Licence Judo - catégorie : Quartier |
| Self Défense | 160 TTC taxe 0% | Licence | Licence Judo - catégorie : Self Défense |
| Féminin | 160 TTC taxe 0% | Licence | Licence Judo - catégorie : Féminin |
| Taïso | 160 TTC taxe 0% | Licence | Licence Judo - catégorie : Taïso |

## Ajout des documents
1. Créer un dossier « Documents_a_envoyer » dans l’arborescence manuelle du module Documents.
2. Ajouter les fichiers suivants :
    - Attestation-QS-sport.pdf
    - Attestation-relative-etat-de-sante-du-sportif-mineur.pdf
    - Horaires.pdf
    - Regles-autours-du-certificat-medical-et-des-attestations-sur-honneur.pdf