import { LandingGraph } from "@/components/landing-graph";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="overflow-hidden m-0 h-[100%]">
      <header className="flex flex-row m-4 gap-4">
        <Image src="/logo.svg" alt="logo" width={100} height={100} />
        <Button className="ml-auto" variant={"ghost"}>Login</Button>
        <Button>Try NFA Free</Button>
      </header>
      <section className="flex flex-col items-center gap-4 mt-20">
        <div className="flex flex-col items-center text-[76px] font-extrabold" style={{ lineHeight: "1" }}>
          <span>Finance...</span>
          <span>for the rest of us</span>
        </div>
        <span className="text-center max-w-xl text-xl opacity-80">
          Create a strong financial future with personalized insignts, tools,
          and resources. No financial expertise required.
        </span>
        <Button size="lg">Try NFA Free Today!</Button>
      </section>
      <div className="absolute bottom-0 w-full scale-x-110 overflow-hidden">
        <LandingGraph />
      </div>
    </div>
  );
}
