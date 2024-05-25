import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { email, password } = await req.json();
       
        if (!email || !password) {
            console.log(email);
            console.log(password);
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const { data: userData, error: fetchError, status: fetchStatus, statusText: fetchStatusText } = await supabase
            .from('Users')
            .select('*')
            .eq('email', email)
            .single();
            console.log(userData);
        if (fetchError || !userData) {
            console.error('Supabase fetch error:', fetchError?.message || 'User not found');
            return NextResponse.json({ error: fetchError?.message || 'User not found', status: fetchStatus, statusText: fetchStatusText }, { status: fetchStatus || 404 });
        }


        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const secret = process.env.JWT_SECRET || "hello";
        console.log(secret);
        const token = jwt.sign({ id: userData.id, email: userData.email }, secret, { expiresIn: '1h' });

        const response = NextResponse.json(userData);
        response.cookies.set("User", token);
        return response;

    } catch (err) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
