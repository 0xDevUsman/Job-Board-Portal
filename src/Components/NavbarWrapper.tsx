"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Components/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Hide Navbar on these routes or anything under /recruiter
  const shouldHide =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/recruiter");

  return shouldHide ? null : <Navbar />;
}
