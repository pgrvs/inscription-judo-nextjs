import "./globals.scss"
import style from "./Layout.module.scss"
import LogoBlanc from "@/assets/LogoBlanc"

export const metadata = {
  title: "Judo inscription adhérents",
  description: "Outil qui facilite l'inscription des adhérents du cercle du judo de Vesoul",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
          <LogoBlanc className={style.Logo} width="170" height="69"/>
          {children}
      </body>
    </html>
  )
}
