"use client"
import Link from "next/link"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { ToastAction } from "@/components/ui/toast"

import { useToast } from "@/components/ui/use-toast"
export default function page() {
    const router = useRouter()

    const { toast } = useToast();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e:any) => {
        e.preventDefault()
        
        
        // try {
        //     setLoading(true)
        //     const response = await PostData({ email, name, username, password }, "/api/register")
        //     setLoading(false);
            
        //     toast({
        //         description: "Your user account has been successfully created.",
        //       })
        //     setPassword("");
        //     setEmail("");
        //     setName("")
        //     setUsername("")
        //     router.push("/")
        // }
        // catch (error) {
        //     let errorMessage = "There was a problem creating your account. Please try again later.";

        //     toast({
        //         variant: "destructive",
        //         title: "Error",
        //         description: errorMessage,
        //         action: <ToastAction altText="Try again">Try again</ToastAction>,
        //     });
        // }
    }
    return (
        <div className="flex h-screen items-center  justify-center">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">Name</Label>
                                <Input id="first-name" placeholder="Max" value={name} required onChange={(e) => { setName(e.target.value) }} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">User name</Label>
                                <Input id="last-name" placeholder="Robinson_pych" value={username} required onChange={(e) => { setUsername(e.target.value) }} />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                required
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        {loading ? (<Button disabled>
                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>) : (<Button type="submit" className="w-full" onClick={handleSubmit} disabled={loading}>
                            Create an account
                        </Button>)}
                        <Button variant="outline" className="w-full" >
                            Sign up with Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/signin" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}