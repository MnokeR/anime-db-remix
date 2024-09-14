import { NavLink } from "@remix-run/react";
import clsx from "clsx";

const links = [
  { label: "Home", path: "/" },
  { label: "Search", path: "/search" },
];
const active = "text-primary";

function Navbar({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={clsx("flex gap-4", className)}>
      {links.map((link) => (
        <NavLink
          key={link.label}
          to={link.path}
          className={({ isActive }) => (isActive ? active : "")}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navbar;
