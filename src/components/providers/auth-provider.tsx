'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

type UserRole = 'admin' | 'client'

interface AuthContextType {
    role: UserRole
    login: (role: UserRole) => void
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [role, setRole] = useState<UserRole>('admin')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const storedRole = localStorage.getItem('jdash_role') as UserRole
        const storedAuth = localStorage.getItem('jdash_auth') === 'true'

        if (storedAuth && storedRole) {
            setRole(storedRole)
            setIsAuthenticated(true)
        }
    }, [])

    const login = (newRole: UserRole) => {
        setRole(newRole)
        setIsAuthenticated(true)
        localStorage.setItem('jdash_role', newRole)
        localStorage.setItem('jdash_auth', 'true')
        router.push('/client') // Default to client view for clients? Or just root?
        // Let's redirect to root and let middleware/sidebar handle it, or just root.
        if (newRole === 'client') {
            router.push('/client')
        } else {
            router.push('/')
        }
    }

    const logout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem('jdash_role')
        localStorage.removeItem('jdash_auth')
        router.push('/login')
    }

    return (
        <AuthContext.Provider value={{ role, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
