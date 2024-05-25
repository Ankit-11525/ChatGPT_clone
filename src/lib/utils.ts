import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
const { GoogleGenerativeAI } = require("@google/generative-ai");
const GEMINI_API_KEY= process.env.GEMINI_API_KEY;
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// ...

// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// ...
export async function run(prompt:string) {
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  }