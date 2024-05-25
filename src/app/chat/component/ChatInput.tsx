"use client"
import * as React from "react"
import { CheckIcon, PaperPlaneIcon, PlusIcon } from "@radix-ui/react-icons"
import { FaArrowUp } from "react-icons/fa6";
import axios from "axios"
import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const users = [
  {
    name: "Olivia Martin",
    email: "m@example.com",
    avatar: "/avatars/01.png",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    avatar: "/avatars/03.png",
  },
  {
    name: "Emma Wilson",
    email: "emma@example.com",
    avatar: "/avatars/05.png",
  },
  {
    name: "Jackson Lee",
    email: "lee@example.com",
    avatar: "/avatars/02.png",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    avatar: "/avatars/04.png",
  },
] as const

type User = {
  id: string;
  username: string;
  email: string;
};

type Props = {
  User: User;
};

export function ChatInput(props: Props) {
  console.log(props);
  const User = props.User;
  const [open, setOpen] = React.useState(false)
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([])

  const [messages, setMessages] = React.useState([
    {
      role: "agent",
      content: "Hi, how can I help you today?",
    },
    {
      role: "user",
      content: "Hey, I'm having trouble with my account.",
    }
  ])
  const [input, setInput] = React.useState("")
  const inputLength = input.trim().length


  const handleQuestionUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inputLength === 0) return
    setMessages(prevMessages => [
      ...prevMessages,
      {
        role: "user",
        content: input,
      },
    ])
    setInput("")
    const formData = new FormData();
    formData.append('question', input);
    console.log('ankit : question is : ', input);


    try {


      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log("User : ",User.id);
      const userid=User.id;
      const response = await axios.post('/api/addquestion', {input,userid}, config);
      setMessages(prevMessages => [
        ...prevMessages,
        {
          role: "agent",
          content: response.data.mainResponse[0].answer_desc
        },
      ])

    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="max-h-screen max-w-full p-1" >
      <Card className="relative flex-1 max-w-full h-screen p-4 bg-chatbg">
        <CardHeader className="abolute top-0 flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="Image" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{User.username}</p>
              <p className="text-sm text-muted-foreground">{User.email}</p>
            </div>
          </div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="ml-auto rounded-full"
                  onClick={() => setOpen(true)}
                >
                  <PlusIcon className="h-4 w-4" onClick={()=>setMessages([])} />
                  <span className="sr-only">New Chat</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>New Chat</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent className="p-0 w-full h-screen pb-[250px]">
          <div className="h-full overflow-y-scroll no-scrollbar max-w-full p-2"  >
            <div className="max-w-full flex flex-col gap-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn("flex w-fit max-w-[75%] rounded-lg px-3 py-2 text-sm", message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                  )}
                >
                  {message.content}
                </div>
            ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="absolute bottom-0 w-full px-4 xl:px-48 flex flex-col">
          <form
            onSubmit={handleQuestionUpload}
            className="flex w-full items-center space-x-2 p-2 border-2 rounded-lg"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1 appearance-none outline-none border-0 focus:border-0"
              autoComplete="off"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type="submit" size="icon" disabled={inputLength === 0}>
              {/* <PaperPlaneIcon className="h-4 w-4" /> */}
              <FaArrowUp className="text-xl bg-opacity-50"/>
              <span className="sr-only">Send</span>
            </Button>
          </form>
          <div className="text-xs lg:text-sm pt-2">
            By messaging ChatGPT, you agree to our Terms and have read our Privacy Policy.
            </div>
        </CardFooter>
      </Card>
      {/* <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0 outline-none">
          <DialogHeader className="px-4 pb-4 pt-5">
            <DialogTitle>New message</DialogTitle>
            <DialogDescription>
              Invite a user to this thread. This will create a new group
              message.
            </DialogDescription>
          </DialogHeader>
          <Command className="overflow-hidden rounded-t-none border-t bg-transparent">
            <CommandInput placeholder="Search user..." />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup className="p-2">
                {users.map((user) => (
                  <CommandItem
                    key={user.email}
                    className="flex items-center px-2"
                    onSelect={() => {
                      if (selectedUsers.includes(user)) {
                        return setSelectedUsers(
                          selectedUsers.filter(
                            (selectedUser) => selectedUser !== user
                          )
                        )
                      }

                      return setSelectedUsers(
                        [...users].filter((u) =>
                          [...selectedUsers, user].includes(u)
                        )
                      )
                    }}
                  >
                    <Avatar>
                      <AvatarImage src={user.avatar} alt="Image" />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    {selectedUsers.includes(user) ? (
                      <CheckIcon className="ml-auto flex h-5 w-5 text-primary" />
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
            {selectedUsers.length > 0 ? (
              <div className="flex -space-x-2 overflow-hidden">
                {selectedUsers.map((user) => (
                  <Avatar
                    key={user.email}
                    className="inline-block border-2 border-background"
                  >
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Select users to add to this thread.
              </p>
            )}
            <Button
              disabled={selectedUsers.length < 2}
              onClick={() => {
                setOpen(false)
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  )
}
