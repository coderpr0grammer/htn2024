'use client'
import React from 'react';
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"

import { DashboardMain } from "../../components/dashboard-components/dashboard-main"
import { useAuth } from '../infrastructure/auth/auth.context';
import { AvatarImage } from '@radix-ui/react-avatar';

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="overflow-hidden m-0">
      <header className="flex flex-row m-4 gap-4">
        <Image src="/img/logo.svg" alt="logo" width={100} height={100} className="h-12 w-auto" />
        <div className='ml-auto flex flex-row font-bold gap-4 my-auto align-middle'>
          <span className='h-6 my-auto'>{user?.data.name}</span>
          <Avatar>
            {user?.photoURL &&
              <AvatarImage src={user?.photoURL} alt="@shadcn" />
            }
            <AvatarFallback>{user?.data.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <section className="flex flex-col mx-auto gap-4 p-2 transition-all duration-300 ease-in-out">
        <DashboardMain />
      </section>
    </div>
  );
}