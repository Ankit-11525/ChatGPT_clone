import { NextResponse, NextRequest } from "next/server";
import { supabase } from "../../../lib/supabase"

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const formaData = await req.json();
        console.log(formaData);
        const { data, error } = await supabase
            .from('Questions')
            .insert([
                {
                    question_desc: formaData
                }
            ]);
            const data1="Data inserted successfully"
        if (data1) {
            console.log(data1);
            const response = await NextResponse.json({ data1 }, { status: 200 })
            return response;
        }
        if (error) {
            const response = await NextResponse.json({ error }, { status: 400 })
            return response;
        }
    } catch (err) {
        const response = await NextResponse.json({ err }, { status: 500 })
        return response;
    }
}