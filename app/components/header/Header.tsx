import { Link } from "@remix-run/react";
import ToggleTheme from "../ToggleTheme";
import Navbar from "./Navbar";

function Header() {
  return (
    <header className="flex h-14 bg-secondary text-secondary-foreground items-center px-5">
      <div className="flex-1">
        <h1 className="text-3xl font-semibold">
          <Link to="/">
            ANIME<span className="text-primary">DB</span>
          </Link>
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Navbar />
        <ToggleTheme />
      </div>
    </header>
  );
}

export default Header;
