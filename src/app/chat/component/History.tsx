import React, { useEffect, useState } from 'react'
import { PanelRightClose } from 'lucide-react'
import { supabase } from "../../../lib/supabase"
import { cn } from '@/lib/utils'
type User = {
    id: string;
    username: string;
    email: string;
};

type Props = {
    User: User;
}; const data = [
    {
        "id": 1,
        "timestamp": "2024-05-23T10:00:00Z",
        "role": "user",
        "content": "Hello, ChatGPT!"
    },
    {
        "id": 2,
        "timestamp": "2024-05-23T10:00:05Z",
        "role": "assistant",
        "content": "Hello! How can I assist you today?"
    },
    {
        "id": 3,
        "timestamp": "2024-05-23T10:01:00Z",
        "role": "user",
        "content": "Can you tell me a joke?"
    },
    {
        "id": 4,
        "timestamp": "2024-05-23T10:01:10Z",
        "role": "assistant",
        "content": "Sure! Why don't scientists trust atoms? Because they make up everything!"
    },
    {
        "id": 5,
        "timestamp": "2024-05-23T10:02:00Z",
        "role": "user",
        "content": "That's funny! Can you give me some advice on learning programming?"
    },
    {
        "id": 6,
        "timestamp": "2024-05-23T10:02:30Z",
        "role": "assistant",
        "content": "Absolutely! Here are a few tips to get started with programming:\n1. Choose a programming language that suits your goals.\n2. Practice regularly by building small projects.\n3. Make use of online resources and communities.\n4. Don't be afraid to ask for help when you get stuck.\n5. Keep learning and stay curious!"
    }

]
const History = (props: Props) => {
    const [questions, setQuestions] = useState<any[]>([]);
    console.log(props.User);
    const [show, setShow] = useState<boolean>(true);
    // const theme=localStorage.getItem("theme")==='light';
    const [theme, setTheme] = useState<boolean>(true);
    useEffect(() => {
        const data: boolean = localStorage.getItem("theme") === "light";
        setTheme(data);

    }, [theme]);
    useEffect(() => {
        // Fetch last 10 questions from Supabase
        const fetchQuestions = async () => {
            try {
                const { data: questionsData, error } = await supabase
                    .from('Questions')
                    .select('*').eq('user_id', props.User.id)
                    .order('created_at', { ascending: false })
                    .limit(20);

                if (error) {
                    console.error('Error fetching questions:', error);
                    return;
                }

                setQuestions(questionsData || []);


            } catch (error) {
                console.error('Error fetching questions:', (error as Error).message);
            }
        };

        fetchQuestions();
    }, ); // Empty dependency array

    return (
        <div className='p-4 h-screen'>
            <div className='relative top-0 cursor-pointer fidex p-2 pb-4'>
                <PanelRightClose size={20} onClick={() => { setShow(!show) }} />
            </div>
            <div className={cn(
                "transition-all ease-in-out duration-300 ",
                show ? " opacity-100" : "w-0 opacity-0"
            )}>
                <div className='p-2 py-4 font-bold border-y-2'>
                    All Chats
                </div>
                <div className='h-full overflow-y-scroll no-scrollbar'>
                    {
                        questions.map((items, key) => { return <div className={cn("rounded  cursor-pointer p-2 overflow-hidden w-[220px] whitespace-nowrap text-ellipsis m-1 text-[15px] ", theme ? "hover:bg-customGray" : "hover:bg-muted")} key={key}>{items.question_desc}</div> })
                    }
                </div>
            </div>

        </div>

    )
}

export default History;
