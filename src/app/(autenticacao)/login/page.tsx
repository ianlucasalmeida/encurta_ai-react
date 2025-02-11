import { LogoutCard } from '@/app/components-form-and-navbar/logout-card';
import { auth } from '../../../../auth';

import LoginForm from '@/app/components-form-and-navbar/forms/login-form';
export default async function LoginPage(){
    const session = await auth();
    if(session){
        return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <hr />
            <LogoutCard />
        </main>);
    }
    return (<main className="flex min-h-screen flex-col items-center p-24">
    <hr />
        <LoginForm />
   </main>);
};