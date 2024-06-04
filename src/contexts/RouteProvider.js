"use client"

import { useEffect, useState, createContext } from 'react'
import { usePathname } from 'next/navigation'

export const RouteContext = createContext()

const RouteProvider = ({ children }) => {
    const location = usePathname()
    const [previousRoute, setPreviousRoute] = useState(null)

    useEffect(() => {
        setPreviousRoute(location)
    }, [location])

    return (
        <RouteContext.Provider value={previousRoute}>
            {children}
        </RouteContext.Provider>
    )
}

export default RouteProvider