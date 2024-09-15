import React from 'react';
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"

import { Charts } from "./main"
import { SidebarLayout } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';

export default function Dashboard() {

  const greeting = new Date().getHours() < 12
    ? "Good morning"
    : new Date().getHours() < 18
      ? "Good afternoon"
      : "Good evening";


  return (
    <SidebarLayout
      defaultOpen={cookies().get("sidebar:state")?.value === "true"}
    >
      {/* <AppSidebar /> */}
      <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
        <div className="h-full rounded-md border-2 border-dashed">
          {/* <SidebarTrigger /> */}

          <Charts/>
        </div>
      </main>
    </SidebarLayout>
  );
}