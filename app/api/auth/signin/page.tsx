"use client";

import Header from "@/components/Header";
import { signIn } from "next-auth/react";
import Text from "@/components/Text";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

const roleGlobal = ""

export default function SignInPage() {
  const divStyle = {
    backgroundImage: 'url(/Bg.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
  };
   
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn("google", {
      callbackUrl : "/api/home?role=STUDENT",
      redirect : false
    });
    console.log("Form submitted");
  }; 

  return (
    <div style={divStyle} className="relative">
     
      <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 backdrop-blur-md z-10" />
      
     
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2  backdrop-blur-md w-[80%] z-5">
        <Header url="/api/auth/signin"/>
      </div>
      <div className="flex justify-center items-center backdrop-blur-md   h-full z-5">
        
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-30">
      
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to CampusConnect
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to CampusConnect to get started
      </p>
 
      <form className="my-8" onSubmit={handleSubmit}>
    
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>
        
 
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign in &rarr;
          <BottomGradient />
        </button>
 
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
 
        <div className="flex flex-col space-y-4">

        <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          
          
        </div>

        <div className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-300">
              Already signed up?{" "}
              <a href="/api/auth/signup" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </div>
            <div className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-300">
              Posting gigs?{" "}
              <a href="/api/auth/signinAdmin" className="text-blue-600 hover:underline">
                Sign in as Admin
              </a>
            </div>
      </form>
    </div>
      
    </div>
    </div>
  );
}


const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };
   
  const LabelInputContainer = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    );
  };