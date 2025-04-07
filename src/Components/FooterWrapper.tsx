"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  const hideFooterRoutes = ["/login", "/register"];

  return hideFooterRoutes.includes(pathname) ? null : <Footer />;
}
