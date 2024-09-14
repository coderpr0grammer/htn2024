import React from 'react';
import { LandingGraph } from "@/components/landing-graph";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/infinite-moving-cards";
import Image from "next/image";

export default function Home() {
  const testimonials = [
    {
      quote: "NFA helped me understand my finances better than ever before.",
      name: "Alex Johnson",
      title: "Small Business Owner"
    },
    {
      quote: "The personalized insights are game-changing for my financial planning.",
      name: "Sarah Lee",
      title: "Freelance Designer"
    },
    {
      quote: "I feel more confident about my financial future thanks to NFA.",
      name: "Michael Chen",
      title: "Software Engineer"
    },
  ];

  return (
    <div className="overflow-hidden m-0 h-[100%]">
      <header className="flex flex-row m-4 gap-4">
        <Image src="/img/NFA-logo.svg" alt="logo" width={100} height={100} className="h-12 w-auto" />
        <Button className="ml-auto" variant={"ghost"}>Login</Button>
        <Button>Try NFA Free</Button>
      </header>
      <section className="flex flex-col items-center gap-4 mt-20 px-4">
        <div className="flex flex-col items-center text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-extrabold text-center" style={{ lineHeight: "1.1" }}>
          <span>Finance for the rest of us.</span>
        </div>
        <span className="text-center max-w-xl text-base sm:text-lg md:text-xl opacity-80">
          Create a strong financial future with personalized insights, tools, and resources. No financial expertise required.
        </span>
        <Button size="lg">Get Started</Button>
        <div className="w-full max-w-4xl mt-8">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </section>
      <div className="absolute bottom-0 w-full scale-x-110 overflow-hidden">
        <LandingGraph />
      </div>
    </div>
  );
}