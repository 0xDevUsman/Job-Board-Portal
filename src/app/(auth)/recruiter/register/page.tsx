import Register from "@/Components/Register";
import React from "react";

const page = () => {
  return (
    <Register showOAuth={false} showRoleInput={true} defaultRole="recruiter" />
  );
};

export default page;
