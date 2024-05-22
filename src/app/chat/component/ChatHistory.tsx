import React from 'react'

type Props = {}
const data = [
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
  },
  {
    "id": 7,
    "timestamp": "2024-05-23T10:03:00Z",
    "role": "user",
    "content": "Thanks! I'll follow your advice."
  },
  {
    "id": 8,
    "timestamp": "2024-05-23T10:03:10Z",
    "role": "assistant",
    "content": "You're welcome! If you have any more questions, feel free to ask."
  }
  ,
  {
    "id": 8,
    "timestamp": "2024-05-23T10:03:10Z",
    "role": "assistant",
    "content": "You're welcome! If you have any more questions, feel free to ask."
  },
  {
    "id": 8,
    "timestamp": "2024-05-23T10:03:10Z",
    "role": "assistant",
    "content": "You're welcome! If you have any more questions, feel free to ask."
  },
  {
    "id": 8,
    "timestamp": "2024-05-23T10:03:10Z",
    "role": "assistant",
    "content": "You're welcome! If you have any more questions, feel free to ask."
  },
  {
    "id": 8,
    "timestamp": "2024-05-23T10:03:10Z",
    "role": "assistant",
    "content": "You're welcome! If you have any more questions, feel free to ask."
  },
  {
    "id": 8,
    "timestamp": "2024-05-23T10:03:10Z",
    "role": "assistant",
    "content": "You're welcome! If you have any more questions, feel free to ask."
  },
  {
    "id": 8,
    "timestamp": "2024-05-23T10:03:10Z",
    "role": "assistant",
    "content": "You're welcome! If you have any more questions, feel free to ask."
  },
  {
    "id": 8,
    "timestamp": "2024-05-23T10:03:10Z",
    "role": "assistant",
    "content": "You're welcome! If you have any more questions, feel free to ask."
  },
  {
    "id": 8,
    "timestamp": "2024-05-23T10:03:10Z",
    "role": "assistant",
    "content": "You're welcome! If you have any more questions, feel free to ask."
  },
  {
    "id": 8,
    "timestamp": "2024-05-23T10:03:10Z",
    "role": "assistant",
    "content": "You're welcome! If you have any more questions, feel free to ask."
  },
  {
    "id": 8,
    "timestamp": "2024-05-23T10:03:10Z",
    "role": "assistant",
    "content": "You're welcome! If you have any more questions, feel free to ask."
  },
  {
    "id": 8,
    "timestamp": "2024-05-23T10:03:10Z",
    "role": "assistant",
    "content": "You're welcome! If you have any more questions, feel free to ask."
  },
  {
    "id": 8,
    "timestamp": "2024-05-23T10:03:10Z",
    "role": "assistant",
    "content": "You're welcome! If you have any more questions, feel free to ask."
  },
  {
    "id": 8,
    "timestamp": "2024-05-23T10:03:10Z",
    "role": "assistant",
    "content": "You're welcome! If you have any more questions, feel free to ask."
  }, {
    "id": 8,
    "timestamp": "2024-05-23T10:03:10Z",
    "role": "assistant",
    "content": "You're welcome! If you have any more questions, feel free to ask."
  },
  {
    "id": 8,
    "timestamp": "2024-05-23T10:03:10Z",
    "role": "assistant",
    "content": "You're welcome! If you have any more questions, feel free to ask."
  }, {
    "id": 8,
    "timestamp": "2024-05-23T10:03:10Z",
    "role": "assistant",
    "content": "You're welcome! If you have any more questions, feel free to ask."
  },
  {
    "id": 8,
    "timestamp": "2024-05-23T10:03:10Z",
    "role": "assistant",
    "content": "You're welcome! If you have any more questions, feel free to ask."
  },
  {
    "id": 8,
    "timestamp": "2024-05-23T10:03:10Z",
    "role": "assistant",
    "content": "You're welcome! If you have any more questions, feel free to ask."
  }
]
const ChatHistory = (props: Props) => {
  return (
    <div className=' h-screen '>
      <div className=' mt-[50px]   overflow-scroll h-screen no-scrollbar'>
        {
          data.map((items, key) => { return <div className='rounded hover:bg-customGray cursor-pointer p-2 overflow-hidden w-[220px] whitespace-nowrap text-ellipsis m-1 text-[15px] ' key={key}>{items.content}</div> })
        }
      </div>

    </div>
  )
}

export default ChatHistory;