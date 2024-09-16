import { IGroup } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import JoinButton from "../JoinButton/page";

const RenderGroup = ({ data }: { data: IGroup }) => {
  const [group, setGroup] = useState(data);
  return (
    <div className="w-[calc(50%-8px)] sm:w-[calc(33%-8px)] min-h-32 p-2 bg-white rounded-lg  flex flex-col gap-2 justify-between ">
      <Link
        href={`/group/${group?._id}`}
        className="flex-shrink-0 flex flex-col justify-center items-center "
      >
        <Image
          src={group?.avatar}
          alt={group?.name}
          width={70}
          height={70}
          className="rounded-full"
        />
      </Link>
      <Link
        href={`/group/${group?._id}`}
        className="text-base text-center font-semibold"
      >
        {group.name}
      </Link>
      <JoinButton group={group} setGroup={setGroup} />
    </div>
  );
};

export default RenderGroup;
