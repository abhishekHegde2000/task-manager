import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authAtom } from "@/store/atoms/auth";
import { Button, buttonVariants } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ProfileDropDownProps = {
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useRecoilState(authAtom);

  useEffect(() => {
    const isTokenAvailable = localStorage.getItem("token");

    if (isTokenAvailable) {
      setIsAuthorized(true);
    }
  }, []);

  return (
    <nav className="sticky top-0 flex w-full items-center justify-between bg-zinc-950 p-4">
      <Link to={"/"} className="text-lg font-medium">
        Task Manager
      </Link>

      {isAuthorized ? (
        <div className="flex items-center justify-center gap-6">
          <Link to={"/tasks"} className="hidden hover:underline sm:block">
            Tasks
          </Link>

          <Button
            size={"sm"}
            className="hidden sm:block"
            onClick={() => {
              localStorage.removeItem("token");
              setIsAuthorized(false);
              navigate("/signin");
            }}
          >
            Logout
          </Button>

          <ProfileDropDown setIsAuthorized={setIsAuthorized} />
        </div>
      ) : (
        <div>
          <Link
            className={buttonVariants({ variant: "ghost", size: "sm" })}
            to={"/signin"}
          >
            Sign in
          </Link>

          <Link
            className={buttonVariants({ variant: "ghost", size: "sm" })}
            to={"/signup"}
          >
            Sign up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

const ProfileDropDown = ({ setIsAuthorized }: ProfileDropDownProps) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="block rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 sm:hidden"
        ></Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate("/tasks")}>
          Tasks
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            setIsAuthorized(false);
            localStorage.removeItem("token");
            navigate("/signin");
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
