import { Outlet } from 'react-router';

import websnakeLogo from '@/assets/snake.svg';

const AuthLayout = () => {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className=" flex justify-center items-center">
        <Outlet />
      </div>

      <div className="flex justify-center items-center ">
        <img src={websnakeLogo} alt="Websnake" />
      </div>
    </div>
  );
};
export default AuthLayout;
