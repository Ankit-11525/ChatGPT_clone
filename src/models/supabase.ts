// types/supabase.ts
import {Users} from "./Users"
import {Chats} from "./Chats"
import {Questions} from "./Questions"
import {Answers} from "./Answers"

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      Users: {
        Row: Users;
        Insert: Partial<Users>; 
        Update: Partial<Users>; 
      }
      Chats: {
        Row: Chats;
        Insert: Partial<Users>; 
        Update: Partial<Users>; 
      }
      Questions: {
        Row: Questions;
        Insert: Partial<Users>; 
        Update: Partial<Users>; 
      }
      Answers: {
        Row: Answers;
        Insert: Partial<Users>; 
        Update: Partial<Users>; 
      }
    }
  }
}
