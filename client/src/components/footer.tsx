import { Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between px-10 py-5 text-sm text-white/70">
      <p>&copy; 2024 Task Manager</p>

      <Link to={"https://github.com/abhishekHegde2000"}>
        <Github />
      </Link>
    </footer>
  );
};

export default Footer;
