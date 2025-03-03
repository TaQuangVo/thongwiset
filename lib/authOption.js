import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            username: { label: "Username", type: "text", placeholder: "User name" },
            password: { label: "Password", type: "Password" }
          },
          async authorize(credentials, req) {
            const superUser = { id: "1", name: "Fin A", email: "thongwiset@icloud.com" }

            const { username, password } = credentials;

            if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
              return superUser
            }
            
            return null;
          }
        })
      ]
}

export {authOptions}