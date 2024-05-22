"use client"
import React, { useEffect } from 'react'
import ChatLayout from './component/ChatLayout'
import ChatHistory from './component/ChatHistory'
type Props = {}

const page = (props: Props) => {
    useEffect(()=>{
      
        const body=document.getElementsByTagName('body')
        body[0].style.overflow="hidden"
    
    })
    return (
        <div className='flex flex-column h-screen   '>
            <ChatHistory />
            <ChatLayout />

        </div>
    )
}

export default page