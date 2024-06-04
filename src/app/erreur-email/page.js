import NavigationAccueil from "@/components/NavigationAccueil"
import Message from "@/components/Message"

export default function ErreurEmail() {
  return (
      <>
          <NavigationAccueil/>
          <div className="container">
              <h1>Erreur lors de l'envoi des emails</h1>
              <Message
                  message={"Les emails automatiques ne se sont pas envoyé, veuillez le faire manuellement."}
              />
          </div>
      </>
  )
}
