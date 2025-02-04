import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

export default function CFTLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
        src="/CFT-F22.png"
        height={2500}
        width={1875}
        className="block flex-1"
        alt="CFT logo with F22"
      />
      <p className="text-[44px]">Compendium Federal Technologies</p>
    </div>
  );
}
