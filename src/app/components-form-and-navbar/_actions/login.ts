'use server';
import { redirect } from 'next/navigation';
import { signIn } from "../../../../auth";
import db from "../../../../lib/db";

export default async function login(formData: FormData) {
    console.log("login");
    const { email, password } = Object.fromEntries(formData.entries()) as { email: string, password: string };
    console.log("email", email, "password", password);
    try {
        console.log(email, password);
        
        
        const user = await db.user.findUnique({
            where: {
                email: email
            }
        })
        if (!user) {
            console.log('email não cadastrado.');
            return {
                error: 'email não cadastrado.'
            }
        }

        const result = await signIn('credentials', {
            redirect: false, // Não redirecionar automaticamente
            email,
            password
        });
        console.log(result);
        if (result.error) {
            throw result.error;
        }
    } catch (error: any) {
        if (error.name === 'CallbackRouteError') {
            return {
                error: "Provavelmente você errou a senha"
            };
        }
        console.error(error);
    }

    redirect('/home');
}