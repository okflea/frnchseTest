import { Franchisee, Role } from "@/types";
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      firstname: string;
      lastname: string;
      username: string;
      accessToken: string;
      franchisee: Franchisee;
      role: Role;
    }
  }
}
