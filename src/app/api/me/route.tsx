import { NextResponse, NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"; // Import JwtPayload
import { supabase } from "@/lib/supabase";

import { error } from "console";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const cookie = await req.cookies.get("User");
        if (!cookie) {
            throw new Error("User not logged in ")
        }

        const jwt_secret = await process.env.JWT_SECRET|| "hello";;
        if (!jwt_secret) {
            throw new Error("JWT secret not found in environment variables");
        }
        console.log(cookie.value);
        if (!cookie.value) {
            throw new Error("User already logout")
        }

        const decodedToken = jwt.verify(cookie.value, jwt_secret) as JwtPayload; // Type assertion

        if (!decodedToken || typeof decodedToken !== 'object' || !('id' in decodedToken)) {
            throw new Error("Invalid JWT token or missing 'id' field");
        }

        console.log(decodedToken);
        const email=decodedToken.email;
        const { data: userData, error: fetchError, status: fetchStatus, statusText: fetchStatusText } = await supabase
        .from('Users')
        .select('*')
        .eq('email', email)
        .single();
        console.log(userData);
        return NextResponse.json(userData);
    }
    catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "User not logged in "}, { status: 500 })
    }
}