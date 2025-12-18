import { Outlet } from 'react-router';

import websnakeLogo from '@/assets/websnake.png';

const AuthLayout = () => {
  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      <div className=" flex justify-center items-center px-4 md:px-8 lg:px-16">
        <Outlet />
      </div>

      <div className="hidden lg:flex justify-center items-center bg-red-500 px-4 md:px-8 lg:px-16">
        <div className="max-h-96">
          <img src={websnakeLogo} alt="Websnake" className=" h-full w-full" />
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
