import { getGradient } from '@/lib/utils';

export default function Toast({ username }: { username?: string }) {
  return (
    <div
      className={`rounded-[16px] ${getGradient(
        username
      )} w-[581px] h-[80px] p-0.5 absolute z-10 bottom-10 left-10`}
    >
      <div className="rounded-[16px] w-full h-full bg-[#111111] flex items-center justify-between px-5">
        <p className="text-white text-[13px] font-mono w-[304px] h-[40px] flex items-center justify-center p-3">
          Duplicate this template and deploy it to your favorite git provider
        </p>
        <a
          className="text-white text-[13px] font-mono bg-black border border-[#333333] hover:border-white transition-all rounded-md w-[220px] h-[40px] flex items-center justify-center whitespace-nowrap"
          href="https://github.com/vercel/mongodb-starter"
          target="_blank"
          rel="noreferrer"
        >
          Clone & Deploy
        </a>
      </div>
    </div>
  );
}
