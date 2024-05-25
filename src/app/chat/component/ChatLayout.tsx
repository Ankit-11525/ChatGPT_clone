import React from 'react'
import { ChatInput } from './ChatInput';

type User = {
  id: string;
  username: string;
  email: string;
};

type Props = {
  User: User;
}; 
const chatHistory = [
  {
      question: "Hello!",
      answer: "Hello! How can I assist you today?"
  },
  {
      question: "Can you create a JavaScript object array of key-value pairs for a ChatGPT chat?",
      answer: "Certainly! Below is an example of a JavaScript object array representing a series of questions and answers in a ChatGPT chat."
  },
  {
      question: "What is the weather like today?",
      answer: "I'm an AI and don't have real-time capabilities, but you can check the latest weather updates on a reliable weather website."
  },
  {
      question: "What is JavaScript?",
      answer: "JavaScript is a versatile programming language commonly used for web development to create interactive and dynamic web pages."
  }
];


const ChatLayout = (props: Props) => {

  return (
    <div className='h-screen w-full   '>
      <ChatInput User={props.User}/>
    </div>
  )
}

export default ChatLayout