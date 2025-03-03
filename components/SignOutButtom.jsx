'use client'
import { useSession, signOut } from "next-auth/react"


export default function SignOutButton ({children}) {
    const { data: session } = useSession()

    if (!session) {
        return (
          <>
          </>
        )
    }

    return (
        <div onClick={() => signOut()}>
            {children}
        </div>
    )
}