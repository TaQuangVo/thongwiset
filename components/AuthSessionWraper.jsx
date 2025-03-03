'use client'
import { SessionProvider } from "next-auth/react"
import { Suspense } from "react";

export default function AuthSessionWraper({children}) {
    return (
        <SessionProvider>
            <Suspense fallback={<div>Loading session...</div>}>
            {children}
            </Suspense>
        </SessionProvider>
    )
}