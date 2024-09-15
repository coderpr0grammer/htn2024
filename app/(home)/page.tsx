'use client'
import React from 'react';
import { LandingGraph } from "@/components/landing-graph";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from 'next/link';
import { useAuth } from '../infrastructure/auth/auth.context';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Home() {

  const { googleLogin } = useAuth()

  const router = useRouter()


  const loginWithGoogle = async () => {
    try {
      await googleLogin()
      router.push('/dashboard')
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Please try again.")
    }
  }


  return (
    <div className="overflow-hidden m-0">
      <header className="flex flex-row m-4 gap-4">
        <Image src="/img/logo.svg" alt="logo" width={100} height={100} className="h-12 w-auto" />
        <Button onClick={googleLogin} className="ml-auto" variant={"ghost"} >

          Login

        </Button>
      </header>
      <section className="flex flex-col items-center gap-4 mt-28 px-4">
        <div className="flex flex-col items-center text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-extrabold text-center" style={{ lineHeight: "1.1" }}>
          <span>Finance for the rest of us.</span>
        </div>
        <span className="text-center max-w-xl text-base sm:text-lg md:text-xl opacity-80">
          Create a strong financial future with personalized insights, tools, and resources. No financial expertise required.
        </span>
        <Button onClick={googleLogin} size="lg">

          Get Started
        </Button>
      </section>
      <div className="absolute bottom-0 w-full overflow-hidden pointer-events-none">
        <LandingGraph />
      </div>
    </div>
  );
}