"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Import shadcn UI components. Adjust paths as needed.
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Optional: if you use toast notifications from shadcn
import { toast } from "sonner"
import {Dancing_Script, Comfortaa} from "next/font/google"




const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false
})

const comfortaa = Comfortaa({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
})

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();



  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError(result.error);
      toast('Något är fel yaoo...');
    } else {
      router.push("/home");
    }
  };

  return (
    <div className='max-w-md mx-auto p-8 h-svh flex justify-center items-center relative'>
      <p className={comfortaa.className + ' absolute top-0 w-screen text-center text-lg mt-5'}>Thongwiset@Admin</p>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 w-80">
            <div>
              <Label htmlFor="username" className="block text-sm font-medium">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password" className="block text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
