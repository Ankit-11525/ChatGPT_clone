"use client"
import React, { useEffect, useState } from 'react'
import ChatLayout from './component/ChatLayout'
import ChatHistory from './component/ChatHistory'
import { PanelRightClose } from 'lucide-react';
import { cn } from '@/lib/utils';
import History from './component/History';
type Props = {}

const Page = (props: Props) => {
    const [show, setShow] = useState(true);
    useEffect(() => {

        const body = document.getElementsByTagName('body')
        body[0].style.overflow = "hidden"

    })

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
            <History/>

            <ChatLayout />

        </div>
    )
}

export default Page;