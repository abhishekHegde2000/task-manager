import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-[80svh] items-center justify-center">
      <section className="flex w-[90vw] flex-col items-center justify-center gap-8 sm:w-[80vw]">
        <h1 className="text-center text-3xl font-medium sm:text-4xl md:text-5xl">
          Simplify Your Day with Task Manager
        </h1>

        <p className="text-center text-sm text-white/70">
          Effortlessly manage your tasks, and boost productivity with our task
          management solution.
        </p>

        <Button onClick={() => navigate("/signin")}>
          Get Started <ArrowRight />
        </Button>
      </section>
    </main>
  );
};

export default Home;
