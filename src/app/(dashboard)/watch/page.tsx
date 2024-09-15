"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/login");
    }
  }, [status]);
  return (
    <section className="w-full h-full flex justify-center items-center ">
      <div className="w-full lg:w-3/4 ">
        <div className="w-full h-full grid place-content-center">
          <div className="w-full bg-white rounded-lg p-3">
            <p>Coming Soon...</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
