import RegisterForm from "@/app/components-form-and-navbar/forms/register-form";
import { LogoutCard } from "@/app/components-form-and-navbar/logout-card";
import { auth } from "../../../../auth";
export default async function LoginPage(){
    const session = await auth();
    if(session){
        return (
        <div className="flex min-h-screen flex-col items-center">
            <hr />

            <LogoutCard />
        </div>);
    }
    return (<div className="flex min-h-screen flex-col items-center w-full">
    <hr />
        <RegisterForm />
   </div>);
};