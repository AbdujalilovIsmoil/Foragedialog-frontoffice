"use client";

import { useEffect } from "react";
import { notFound } from "next/navigation";

const page = () => {
  useEffect(() => {
    notFound();
  }, []);

  return <></>;
};

export default page;
