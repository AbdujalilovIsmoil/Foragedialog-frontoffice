"use client";

import { useLayoutEffect } from "react";
import { notFound } from "next/navigation";

const page = () => {
  useLayoutEffect(() => {
    notFound();
  }, []);

  return <></>;
};

export default page;
