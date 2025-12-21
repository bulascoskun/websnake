import { Outlet } from 'react-router';
import { Toaster } from '@/components/ui/sonner';

import websnakeLogo from '@/assets/websnake.png';

const AuthLayout = () => {
  return (
    <main>
      <Toaster />
      <div className="grid lg:grid-cols-2 min-h-screen">
        <div className=" flex justify-center items-center px-4 md:px-8 lg:px-16">
          <Outlet />
        </div>

        <div className="hidden lg:flex justify-center items-center bg-slate-200 px-4 md:px-8 lg:px-16">
          <div className="max-h-96">
            <img src={websnakeLogo} alt="Websnake" className=" h-full w-full" />
          </div>
        </div>
      </div>
    </main>
  );
};
export default AuthLayout;
