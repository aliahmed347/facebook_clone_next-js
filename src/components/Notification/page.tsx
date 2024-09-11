import React from "react";

const Notifications = ({ className }: { className: string }) => {
  return (
    <div
      className={` ${className}`}
    >
      <ul className="w-full h-full px-3 overflow-y-scroll no-scrollbar">
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <li className="w-full px-2 mt-2 py-1 border-b border-gray-500 rounded-lg bg-[#E4E6E9] ">
              <h3 className="text-sm font-semibold">New Friend Request</h3>
              <p className="text-sm">
                Ali Ahmed sent you friend request please check
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Notifications;
