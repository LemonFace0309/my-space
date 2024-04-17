"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function FooterCTA() {
  const pathname = usePathname();

  if (pathname.includes("pitch")) {
    return null;
  }

  return (
    <div className="border border-border rounded-2xl md:container text-center px-10 py-14 mx-4 md:mx-auto md:px-24 md:py-20 mb-32 mt-24 flex items-center flex-col bg-[#121212]">
      <span className="text-6xl	md:text-8xl font-medium text-white">
        Stress free by MySpace.
      </span>
      <p className="text-[#878787] mt-6">
        MySpace provides you with greater insight into your business and
        <br />
        automates the boring tasks, allowing you to focus on what you love to do
        instead.
      </p>

      <div className="mt-10 md:mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/talk-to-us">
            <Button
              variant="outline"
              className="border border-primary h-12 px-6 border-white text-white hidden md:block"
            >
              Talk to us
            </Button>
          </Link>

          <a href="https://app.MySpace.ai">
            <Button className="h-12 px-5 bg-white text-black hover:bg-white/80">
              Get Early Access
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
