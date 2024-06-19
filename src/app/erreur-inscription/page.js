import NavigationAccueil from "@/components/navigation/NavigationAccueil"
import Message from "@/components/message/Message"

export default function ErreurEmail() {
  return (
      <>
          <NavigationAccueil/>
          <div className="container">
              <h1>Erreur lors de l'inscription</h1>
              <Message
                  message={"Des données sont manquantes pour finir l'inscription !"}
              />
          </div>
      </>
  )
}
