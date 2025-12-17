import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className=" flex justify-center items-center">
        <Outlet />
      </div>

      <div className="flex justify-center items-center">AuthLayout</div>
    </div>
  );
};
export default AuthLayout;
