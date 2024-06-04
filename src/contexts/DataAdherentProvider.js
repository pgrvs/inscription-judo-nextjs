"use client"

import React, { useState, createContext } from 'react'

export const DataAdherentContext = createContext()

const DataAdherentProvider = ({ children }) => {
    const [data, setData] = useState({
        idAdherent: null,
        isAdherentMajeur: null,
        recherche: {},
        adherent: {},
        responsables: [],
        etatSante: {},
        cotisation: {},
        fin: {},
    })

    return (
        <DataAdherentContext.Provider value={{data, setData}}>
            {children}
        </DataAdherentContext.Provider>
    )
}

export default DataAdherentProvider