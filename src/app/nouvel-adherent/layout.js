import RouteProvider from '@/contexts/RouteProvider'
import DataAdherentProvider from '@/contexts/DataAdherentProvider'

export default function RootLayout({ children }) {
    return (
        <RouteProvider>
            <DataAdherentProvider>
                {children}
            </DataAdherentProvider>
        </RouteProvider>
    )
}
