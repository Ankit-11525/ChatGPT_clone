import { NextResponse, NextRequest } from "next/server";
import { supabase } from "../../../lib/supabase"
import { run } from "@/lib/utils"

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        let mainResponse: any[] = [];
        const {input,userid} = await req.json();
        console.log("input" ,input);
        console.log("user",userid);
        const answer = await run(input);
        console.log(answer);
        const uploadans = await supabase
            .from('Answers')
            .insert([
                {
                    answer_desc: answer
                }
            ]);

        const lastInsertedAnswer = await supabase
            .from('Answers')
            .select('*')
            .order('id', { ascending: false })
            .limit(1);

        let lastAnswer: any;
        if (lastInsertedAnswer.error || lastInsertedAnswer.data.length === 0) {
            lastAnswer = "No last answer inserted"
        } else {
            lastAnswer = lastInsertedAnswer.data[0];
        }




        const { data, error } = await supabase
            .from('Questions')
            .insert([
                {
                    question_desc: input,
                    ans_id: lastAnswer.id,
                    user_id:userid
                }
            ]);
        const lastInsertedQuestion = await supabase
            .from('Questions')
            .select('*')
            .order('id', { ascending: false })
            .limit(1);
        let lastQuestion: any;
        if (lastInsertedQuestion.error) {
            lastQuestion = "No last question inserted"
        } else {
            lastQuestion = lastInsertedQuestion.data[0];
        }




        if (lastAnswer) {
            mainResponse.push(lastAnswer);
        }
        if (lastQuestion) {
            mainResponse.push(lastQuestion);
        }

        if (mainResponse) {
            console.log(mainResponse);
            const response = await NextResponse.json({ mainResponse }, { status: 200 })
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