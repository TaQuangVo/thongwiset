'use client'
import { SessionProvider } from "next-auth/react"

export default function AuthSessionWraper({children}) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}