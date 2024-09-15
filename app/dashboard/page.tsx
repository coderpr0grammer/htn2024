import React from 'react';
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"

import { DashboardMain } from "../../components/dashboard-components/dashboard-main"

export default function Dashboard() {
  return (
    <div className="overflow-hidden m-0">
      <header className="flex flex-row m-4 gap-4">
        <Image src="/img/logo.svg" alt="logo" width={100} height={100} className="h-12 w-auto" />
        <div className='ml-auto flex flex-row font-bold gap-4 my-auto align-middle'>
          <span className='h-6 my-auto'>Firstname Lastname</span>
          <Avatar>
            <AvatarFallback>FL</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <section className="flex flex-col mx-auto gap-4 p-2 transition-all duration-300 ease-in-out">
        <DashboardMain />
      </section>
    </div>
  );
}