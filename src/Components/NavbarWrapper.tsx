"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Components/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/login", "/register", "/recruiter/register"];
  const shouldHide = hideNavbarRoutes.some((route) =>
    pathname.startsWith(route)
  );
  return shouldHide ? null : <Navbar />;
}
