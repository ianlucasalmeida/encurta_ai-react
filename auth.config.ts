import { InvalidPassword, UserNotFound } from '@/lib/errors/errorsCase';
import bcryptjs from 'bcryptjs';
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "./lib/db";
const prisma = db;
export default {
    providers: [
        Credentials({
            authorize: async (credentials) => {
                let user = null
                const { email, password } = credentials;
                if(email === undefined || password === undefined){
                    throw new UserNotFound();
                }
                user = await prisma.user.findFirst({
                    where: {
                        email: email,
                    },
                })

                if (!user) {
                    // No user found, so this is their first attempt to login
                    // meaning this is also the place you could do registration
                    throw new UserNotFound();
                    
                } else {
                    // User found, check if the password is correct
                    const passwordMatch = await bcryptjs.compare(String(password), String(user.password));
                    if (!passwordMatch) {
                        // Passwords don't match
                        throw new InvalidPassword();
                        
                    }
                }

                // return user object with the their profile data
                return { id: user.id, email: user.email, name: user.name, image: user.image };
            },
        }),
    ],
}satisfies NextAuthConfig;