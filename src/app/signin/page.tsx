"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react";


import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "@radix-ui/react-toast";
type Props = {}

const page = (props: Props) => {
    const router = useRouter();
    const { toast } = useToast()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log(email + " " + " " + password)
        try {
            const config = {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await axios.post('/api/signin', { email, password }, config);

            toast({
                description: "Your user account has been successfully created.",
            })
            router.push("/chat")
        }
        catch (error) {
            let errorMessage = "There was a problem creating your account. Please try again later.";

            toast({
                variant: "destructive",
                title: "Error",
                description: errorMessage,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        }
    }
    return (
        <div className="flex h-screen items-center justify-center">


            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                value={email}
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                onChange={(e) => { setEmail(e.target.value) }}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" type="password" required onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <Button type="submit" className="w-full" onClick={handleSubmit}>
                            Login
                        </Button>
                        {/* <Button variant="outline" className="w-full">
                            Login with Google
                        </Button> */}
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="signup" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}

export default page