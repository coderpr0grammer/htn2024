'use client'
import React from 'react';
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"

import { DashboardMain } from "../../components/dashboard-components/dashboard-main"
import { useAuth } from '../infrastructure/auth/auth.context';
import Link from 'next/link';

export default function Dashboard() {
  const { user } = useAuth()

  const greeting = `Good ${new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Evening"}`


  return (
    <div className="overflow-hidden m-0 h-screen w-screen flex justify-center items-center flex-col">

      <header className="flex flex-row  gap-4 w-full max-w-6xl px-4 py-4">
          <div className='flex flex-row gap-4 items-center'>
            <Link href="/">
              <Image src="/img/logo.svg" alt="logo" width={100} height={100} className="h-12 w-auto" />
            </Link>
            <div className=' flex flex-col text-primary'>
              <div className='text-sm'>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className='text-lg font-bold'>
                {greeting}, {user?.data.name}!
              </div>
            </div>


          </div>
          <div className='ml-auto flex flex-row font-bold gap-4 my-auto align-middle'>
            <Avatar>
              {user?.photoURL &&
                <AvatarImage src={user?.photoURL} alt={user?.data.name} />
              }
              <AvatarFallback>{user?.data.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
      </header>

      <section className="flex flex-col mx-auto gap-4  transition-all duration-300 ease-in-out overflow-hidden w-full h-full">
        <DashboardMain />
      </section>
    </div>
  );
}