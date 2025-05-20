// components/ClientLayout.tsx
'use client';

import { ReactNode } from "react";
import { Authprovider } from "@/context/Authprovider";
import NavbarWrapper from "@/Components/NavbarWrapper";
import FooterWrapper from "@/Components/FooterWrapper";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

type Props = {
  children: ReactNode;
};

const ClientLayout = ({ children }: Props) => {
  return (
    <Authprovider>
      <NavbarWrapper />
      {children}
      <ToastContainer position="top-right" autoClose={3000} />
      <Toaster position="top-right" />
      <FooterWrapper />
    </Authprovider>
  );
};

export default ClientLayout;
