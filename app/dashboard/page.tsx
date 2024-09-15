'use client'
import React from 'react';
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DashboardMain } from "../../components/dashboard-components/dashboard-main"
import { useAuth } from '../infrastructure/auth/auth.context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user, logout } = useAuth()

  const greeting = `Good ${new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Evening"}`

  const router = useRouter()
  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

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

        <DropdownMenu>
          <DropdownMenuTrigger className='ml-auto flex flex-row font-bold gap-4 my-auto align-middle'>
            <Avatar>
              {user?.photoURL &&
                <AvatarImage src={user?.photoURL} alt={user?.data.name} />
              }
              <AvatarFallback>{user?.data.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent >

            <DropdownMenuItem onClick={handleLogout}>Sign out</DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>

      </header>

      <section className="flex flex-col justify-center items-center gap-4  transition-all duration-300 ease-in-out overflow-hidden w-full h-full">
        <DashboardMain />
      </section>
    </div>
  );
}