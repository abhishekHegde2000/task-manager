import { toast } from "sonner";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { authAtom } from "@/store/atoms/auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const SignIn = () => {
  const navigate = useNavigate();
  const isAuthorized = useRecoilValue(authAtom);
  const setIsAuthorized = useSetRecoilState(authAtom);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Signing in...");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/signin`,
        {
          email,
          password,
        }
      );

      toast.dismiss(toastId);

      if (res.data.success) {
        toast.success(res.data.message);
        setIsAuthorized(true);
        localStorage.setItem("token", res.data.token);
        navigate("/tasks");
      }
    } catch (err) {
      toast.dismiss(toastId);
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleGuestLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Signing in as guest...");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/signin`,
        {
          email: "guest@gmail.com",
          password: "guest123",
        }
      );

      toast.dismiss(toastId);

      if (res.data.success) {
        toast.success(res.data.message);
        setIsAuthorized(true);
        localStorage.setItem("token", res.data.token);
        navigate("/tasks");
      }
    } catch (err) {
      toast.dismiss(toastId);
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  if (isAuthorized) {
    return <Navigate to="/tasks" />;
  }

  return (
    <main className="flex min-h-[80svh] items-center justify-center">
      <section className="flex w-[80vw] flex-col items-center justify-center gap-8 sm:w-[25rem] lg:w-[22rem]">
        <h1 className="text-2xl font-medium">Sign in to Task manager</h1>

        <form className="flex w-full flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center gap-4">
            <Button
              type="button"
              className="w-1/2 font-medium"
              onClick={handleSignIn}
            >
              Login
            </Button>

            <Button
              type="button"
              variant={"outline"}
              className="w-1/2 py-[22px] font-medium"
              onClick={handleGuestLogin}
            >
              Guest Login
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
