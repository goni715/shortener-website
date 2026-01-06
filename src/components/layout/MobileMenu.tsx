"use client";
import { logout } from "@/helpers/SessionHelper";
import useUserInfo from "@/hooks/useUserInfo";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type TProps = {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

const MobileMenu = ({ setIsMenuOpen }: TProps) => {
   const userInfo = useUserInfo();
  const pathname = usePathname();
  const router = useRouter();
  const handleNavigate = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="md:hidden bg-white shadow">
        <div className="space-y-1 px-4 pb-3 pt-2">
          <div
            onClick={() => handleNavigate("/")}
            className={`block rounded-md px-3 py-2 hover:bg-white/10 cursor-pointer ${
              pathname === "/" ? "text-brand-color" : "text-primary"
            }`}
          >
            Home
          </div>
          <div
            onClick={() => handleNavigate("/dashboard")}
            className={`block rounded-md px-3 py-2 hover:bg-white/10 cursor-pointer ${
              pathname === "/dashboard" ? "text-brand-color" : "text-primary"
            }`}
          >
            Dashboard
          </div>
          {userInfo?.userId && (
            <div
              onClick={() =>logout()}
              className={`block rounded-md px-3 py-2 hover:bg-white/10 cursor-pointer ${
                pathname === "/dashboard" ? "text-brand-color" : "text-primary"
              }`}
            >
              Logout
            </div>
          )}
          {userInfo?.userId && (
            <div className="my-3 border-t border-white/20 pt-3">
            <div className="mt-4 flex items-center justify-between gap-2 px-3">
              <div
                onClick={() => handleNavigate("/")}
                className="flex justify-end gap-2 bg-purple-500 text-white rounded-md"
              >
                <h1 className="text-sm p-2 w-full">{userInfo?.fullName}</h1>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
