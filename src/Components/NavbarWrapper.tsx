"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Components/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/login", "/register"];

  return hideNavbarRoutes.includes(pathname) ? null : <Navbar />;
}
