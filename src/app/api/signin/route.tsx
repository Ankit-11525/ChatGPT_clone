import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Fetch the user from the database
        const { data: userData, error: fetchError, status: fetchStatus, statusText: fetchStatusText } = await supabase
            .from('Users')
            .select('*')
            .eq('email', email)
            .single();

        if (fetchError || !userData) {
            console.error('Supabase fetch error:', fetchError?.message || 'User not found');
            return NextResponse.json({ error: fetchError?.message || 'User not found', status: fetchStatus, statusText: fetchStatusText }, { status: fetchStatus || 404 });
        }

        console.log('Fetched user data:', userData);

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, userData.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Create a JWT token
        const secret = process.env.JWT_SECRET || "hello";
        const token = jwt.sign({ id: userData.id, email: userData.email }, secret, { expiresIn: '1h' });

        // Return the token in the response
        const response = NextResponse.json(userData);
        response.cookies.set("User", token);
        return response;

    } catch (err) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
