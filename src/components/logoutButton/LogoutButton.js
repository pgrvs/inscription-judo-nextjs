import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import style from './LogoutButton.module.scss'
import Logout from "@/assets/Logout"

function LogoutButton() {
    const router = useRouter()

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/auth/signin' })
        router.push('/auth/signin')
    }

    return (
        <button className={style.buttonLogout} onClick={handleLogout}>
            <Logout/>Déconnexion
        </button>
    )
}

export default LogoutButton
