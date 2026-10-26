import { ThemesContext } from '@/context/themesContext'
import { useContext } from 'react'

export default function useThemes() {
    const context = useContext(ThemesContext)

    if (!context) throw ("Erreur de chargement")
        
    return context
}