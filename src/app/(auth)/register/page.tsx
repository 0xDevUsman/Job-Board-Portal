import Register from "@/Components/Register";
import React from "react";

const page = () => {
  return (
    <>
      <Register showOAuth={true} showRoleInput={false} defaultRole="employee" />
    </>
  );
};

export default page;
