"use client";
import React, { useEffect, useState } from "react";
import { IGroup, IPost } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import RenderGroup from "@/components/Discover/RenderGroup";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa";

const page = () => {
  const [loading, setLoading] = useState(true);
  // const { groups } = useUserStore();
  const [groups, setGroups] = useState<IGroup[]>();
  const [posts, setPosts] = useState<IPost[]>();
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/login");
    }
  }, [status]);
  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    try {
      setLoading(true);
      const { data } = await axios("/api/group/getDiscoverGroup", {
        method: "GET",
      });
      setGroups(data.groups);
    } catch (error) {
      console.log("🚀 ~ getGroups ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full  flex justify-center items-center ">
      <div className="w-full lg:w-3/4 ">
        <>
          <div className="w-full mb-3">
            <h1 className="text-xl font-bold">Discover Groups</h1>
          </div>
          <div className="w-full flex gap-2">
            <div className="flex flex-wrap justify-start items-stretch gap-2 w-full">
              {loading ? (
                Array.from({ length: 20 }).map((_, index) => {
                  return (
                    <>
                      <div className="w-[calc(50%-8px)] sm:w-[calc(33%-8px)] min-h-32 p-2 bg-[#D1D5DB] rounded-lg  flex flex-col gap-2 justify-between ">
                        <div className="flex-shrink-0 flex flex-col justify-center items-center ">
                          <div className="p-1 w-[70px] h-[70px] grid place-content-center bg-gray-500 rounded-full  ">
                            {/* <IconPlus size={40} /> */}
                          </div>
                        </div>
                        <h4 className="text-base text-center font-semibold w-24 h-3 bg-gray-500 rounded-lg"></h4>
                        <Button
                          className="bg-gray-500 text-gray-500 flex justify-center items-center gap-2"
                          fullWidth
                          placeholder={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                          // onClick={handleLeave}
                        >
                          <div className=""></div>
                        </Button>
                      </div>
                    </>
                  );
                })
              ) : (
                <>
                  <div className="w-[calc(50%-8px)] sm:w-[calc(33%-8px)] min-h-32 p-2 bg-white rounded-lg  flex flex-col gap-2 justify-between ">
                    <div className="flex-shrink-0 flex flex-col justify-center items-center ">
                      <div className="p-1 w-[70px] h-[70px] grid place-content-center bg-[#D1D5DB] rounded-full  ">
                        <IconPlus size={40} />
                      </div>
                    </div>
                    <h4 className="text-base text-center font-semibold">
                      Create Group
                    </h4>
                    <Button
                      className="bg-primary flex justify-center items-center gap-2"
                      fullWidth
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      // onClick={handleLeave}
                    >
                      <FaPlus className="" size={20} />
                      Create
                    </Button>
                  </div>
                  {groups?.map((group: IGroup, index) => {
                    return <RenderGroup key={index} data={group} />;
                  })}
                </>
              )}
            </div>
          </div>
        </>
      </div>
    </section>
  );
};

export default page;
