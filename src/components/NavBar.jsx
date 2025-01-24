import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
export default function NavBar() {
  return (
    <Menubar className="menubar">
      <Logo />
      <div className="logo-container">
        <NavLink to="/" className="logo-text">
          NeoLibrary
        </NavLink>
      </div>
      {/* Navigation Links */}
      <div className="flex gap-4">
        <MenubarMenu>
          <MenubarTrigger>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Login
            </NavLink>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Register
            </NavLink>
          </MenubarTrigger>
        </MenubarMenu>
      </div>
    </Menubar>
  );
}
