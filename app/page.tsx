import AcmeLogo from "@/app/ui/cft-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styles from "@/app/ui/home.module.css";
import { lusitana } from "./ui/fonts";
import Image from "next/image";
import { Redirect } from "next";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <Link
        className="flex h-40 items-end justify-start rounded-md bg-blue-700 p-4 md:h-40"
        href="/dashboard"
      >
        <div className="text-white md:w-48">
          <AcmeLogo />
        </div>
      </Link>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-300 px-6 py-10 md:w-2/5 md:px-20">
          {/*<div className={styles.shape} />*/}
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>Welcome to the Travel Request Application.</strong>
            <br />
            This is the premier application for CFT MECAT members to submit
            travel requests for our esteemed leadership to review and approve!
          </p>
          <Link
            href="/dashboard"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Let's Go!</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center rounded-lg bg-gray-500 p-6 md:w-3/5 md:px-8 md:py-0">
          {/* Add Hero Images Here */}
          <Image
            src="/F22_Sunset.jpg"
            width={2400}
            height={1887}
            className="hidden md:block rounded-lg scale-x-[-1]"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/F22_Sunset.jpg"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
