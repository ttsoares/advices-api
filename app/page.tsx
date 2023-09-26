"use client";

import Loader from "@/components/Loader";

import Image from "next/image";
import { useState, useEffect } from "react";

type Advice = {
  id: number;
  advice: string;
};

// {"slip": { "id": 193, "advice": "Value the people in your life."}}
type Resp = {
  slip: Advice;
};

export default function Home() {
  const [adv, setAdv] = useState<Advice | undefined>();

  const controller = new AbortController();
  const signal = controller.signal;

  async function getAdvice() {
    setAdv(undefined);
    try {
      const response = await fetch("https://api.adviceslip.com/advice", {
        signal,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch advice");
      }
      const data: Resp = await response.json();
      setAdv(data.slip);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAdvice();
    return () => {
      controller.abort();
    };
  }, []);

  if (!adv) return <Loader />;

  return (
    <main className="flex w-full min-h-screen items-center justify-center bg-darkBlue">
      <div className="relative h-fit  py-5 flex flex-col items-center justify-center w-[90%] md:w-1/3 rounded-2xl bg-darkGrayBlue">
        <h2 className="text-xs text-neonGreen tracking-[.4em] mb-6">
          ADVICE #{adv?.id}
        </h2>
        <h1 className="text-white font-bold mb-12 px-6 text-center">{`"${adv?.advice}"`}</h1>
        {/* md/lg */}
        <div className="hidden md:block h-7 mx-auto w-[400px] mb-12 ">
          <Image
            src="/pattern-divider-desktop.svg"
            width={400}
            height={40}
            alt="divider"
          />
        </div>
        {/* sm */}
        <div className="md:hidden h-5 mx-auto w-[270px] mb-12">
          <Image
            src="/pattern-divider-mobile.svg"
            width={300}
            height={30}
            alt="divider"
          />
        </div>
        <div className="absolute -bottom-[30px] inset-x-auto">
          <div
            onClick={() => getAdvice()}
            className="relative w-16 h-16  bg-neonGreen  rounded-full hover:cursor-pointer hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#53FFAB,0_0_15px_#53FFAB,0_0_30px_#53FFAB]"
          >
            <Image
              src="/icon-dice.svg"
              alt="dice"
              width={25}
              height={25}
              className="absolute top-[20px] left-[20px]"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
