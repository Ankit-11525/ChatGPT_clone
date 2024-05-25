// import { NextResponse, NextRequest } from "next/server";
// import { supabase } from "@/lib/supabase";
// import bcrypt from "bcrypt"
// import jwt from "jsonwebtoken"
// export async function POST(req: NextRequest, res: NextResponse) {
//     try {
//         const { email, name, username, password } = await req.json();
//         // const existingUser = await User.findOne({ email });
//         console.log("hello");
//         const User = await supabase
//         .from('Users')
//         .insert([
//             {
//                 username: username,
//                 password:password,
//                 email:email
//             }
//         ]);
//         console.log(User);
//         // if (existingUser) {
//         //     const jwt_secret = await process.env.JWT_SECRET;
//         //     if (!jwt_secret) {
//         //           throw new Error("Internal server Error ");
                
//         //     }
//         //     const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, jwt_secret, { expiresIn: "1y" });
//         //     const response = NextResponse.json(existingUser);
//         //     return response

//         // }

//         // const hashedpassword = await bcrypt.hash(password, 10);
//         // const newUser = new User({ email, username, password: hashedpassword, name });
//         // await newUser.save()
//         // const jwt_secret = await process.env.JWT_SECRET;
//         // if (!jwt_secret) {
//         //     throw new Error("Internal server Error ");
//         // }
//         // const token = jwt.sign({ email: newUser.email, id: newUser._id }, jwt_secret, { expiresIn: "1y" });
//         // const response = NextResponse.json(existingUser);
//         // response.cookies.set("User", token);
//         // return response;
//     }
//     catch (error) {
//         console.log("Error while register user data");
//         return NextResponse.json("Errorwhile posting data"+Error,{status:500});
//     }

// }
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req:NextRequest,res:NextResponse) {
    try {
        const { email, name, username, password } = await req.json();

        if (!email || !username || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        const { data: insertData, error: insertError, status: insertStatus, statusText: insertStatusText } = await supabase
            .from('Users')
            .insert([
                {
                    username: username,
                    password: hashedPassword,
                    email: email
                }
            ])
            .select(); 

        if (insertError) {
            console.error('Supabase insert error:', insertError.message);
            return NextResponse.json({ error: insertError.message, status: insertStatus, statusText: insertStatusText }, { status: insertStatus });
        }

        console.log('Inserted user:', insertData);

        const userId = insertData[0].id;

        // Fetch the inserted user data
        const { data: userData, error: fetchError, status: fetchStatus, statusText: fetchStatusText } = await supabase
            .from('Users')
            .select('*')
            .eq('id', userId);

        if (fetchError) {
            console.error('Supabase fetch error:', fetchError.message);
            return NextResponse.json({ error: fetchError.message, status: fetchStatus, statusText: fetchStatusText }, { status: fetchStatus });
        }

        console.log('Fetched user data:', userData);

        // Create a JWT token
        const secret=await process.env.JWT_SECRET||"hello";
        const token = jwt.sign({ id: userData[0].id, email: userData[0].email }, secret, { expiresIn: '1h' });
        const response=NextResponse.json(userData[0]);
        response.cookies.set("User",token);
        return response;

    } catch (err) {
        // console.error('Error processing request:', err.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
