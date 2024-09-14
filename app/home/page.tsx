import React from 'react';
import { LandingGraph } from "@/components/landing-graph";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="overflow-hidden m-0 h-[100%]">
      <header className="flex flex-row m-4 gap-4">
        <Image src="/img/logo.svg" alt="logo" width={100} height={100} className="h-12 w-auto" />
        <Button className="ml-auto" variant={"ghost"}>Login</Button>
        <Button>Try NFA Free</Button>
      </header>
      <section className="flex flex-col items-center gap-4 mt-28 px-4">
        <div className="flex flex-col items-center text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-extrabold text-center" style={{ lineHeight: "1.1" }}>
          <span>Finance for the rest of us.</span>
        </div>
        <span className="text-center max-w-xl text-base sm:text-lg md:text-xl opacity-80">
          Create a strong financial future with personalized insights, tools, and resources. No financial expertise required.
        </span>
        <Button size="lg">Get Started</Button>
      </section>
      <div className="absolute bottom-0 w-full scale-x-110 overflow-hidden">
        <LandingGraph />
      </div>
    </div>
  );
}