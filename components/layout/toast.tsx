import { getGradient } from '@/lib/gradients';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Toast({ username }: { username?: string }) {
  const [bannerHidden, setBannerHidden] = useState(true);

  useEffect(() => {
    setBannerHidden(Cookies.get('mongo-banner-hidden') === 'true');
  }, []);

  return bannerHidden ? null : (
    <div
      className={`rounded-[16px] ${getGradient(
        username
      )} w-11/12 sm:w-[581px] h-[160px] sm:h-[80px] p-0.5 absolute z-10 bottom-10 left-0 right-0 mx-auto`}
    >
      <div className="rounded-[14px] w-full h-full bg-[#111111] flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-3 sm:space-y-0 px-5">
        <p className="text-white text-[13px] font-mono w-[304px] h-[40px] flex items-center justify-center p-3">
          Get started with MongoDB Atlas and Vercel instantly.{' '}
          <button
            className="contents underline text-blue-400 font-bold"
            onClick={() => {
              setBannerHidden(true);
              Cookies.set('mongo-banner-hidden', 'true');
            }}
          >
            Dismiss →
          </button>
        </p>
        <a
          className="text-white text-[13px] font-mono bg-black border border-[#333333] hover:border-white transition-all rounded-md w-[220px] h-[40px] flex items-center justify-center whitespace-nowrap"
          href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fmongodb-starter&project-name=mongodb-nextjs&repo-name=mongodb-nextjs&demo-title=MongoDB%20Developer%20Directory&demo-description=Log%20in%20with%20GitHub%20to%20create%20a%20directory%20of%20contacts.&demo-url=https%3A%2F%2Fmongodb.vercel.app%2F&demo-image=https%3A%2F%2Fmongodb.vercel.app%2Fog.png&integration-ids=oac_jnzmjqM10gllKmSrG0SGrHOH&env=NEXTAUTH_SECRET&envDescription=Generate%20one%20at%20https%3A%2F%2Fgenerate-secret.now.sh%2F32&envLink=https://next-auth.js.org/deployment#vercel"
          target="_blank"
          rel="noreferrer"
        >
          Clone & Deploy
        </a>
      </div>
    </div>
  );
}
