"use client"
import React, { useEffect, useState } from 'react'
import ChatLayout from './component/ChatLayout'
import ChatHistory from './component/ChatHistory'
import { PanelRightClose } from 'lucide-react';
import { cn } from '@/lib/utils';
import History from './component/History';
import axios from 'axios';
import { useRouter } from 'next/navigation';
type Props = {}

const Page = (props: Props) => {
    const router = useRouter();

    const [show, setShow] = useState(true);
    const [User, setUser] = useState(null);
    useEffect(() => {

        const body = document.getElementsByTagName('body')
        body[0].style.overflow = "hidden"
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/me');
                setUser(response.data);

            } catch (error) {
                router.push('/');
            }

        }
        fetchData();

    },[])
    return (
        <div className='flex flex-column h-screen   '>
            {/* <div className={cn(
                "transition-all ease-in-out duration-300",
                show ? "w-[20%] opacity-100" : "w-0 opacity-0"
            )}>
                <ChatHistory />

            </div>
            <div className='cursor-pointer	relative top-2 m-2 ' onClick={() => { setShow(!show) }}>
                <PanelRightClose size={20} />

            </div> */}
            <History User={User}/>

            <ChatLayout User={User} />

        </div>
    )
}

export default Page;