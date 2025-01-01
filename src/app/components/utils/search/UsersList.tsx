"use client";

import { OtherUser } from "@/app/interfaces/otherUser/interface";
import { searchInputState, usersState } from "@/app/recoil/searchUsersStates";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";

const UsersList: React.FC = () => {
  const users = useRecoilValue<OtherUser[]>(usersState);
  const inputValue = useRecoilValue(searchInputState);
  const router = useRouter();

  return (
    <>
      {users.length > 0 && inputValue !== "" ? (
        <main className="min-w-[400px] absolute top-16 left-1/2 -translate-x-1/2 h-fit bg-white p-5 rounded-3xl shadow-2xl">
          {users.map((user, index) => {
            console.log(`${process.env.NEXT_PUBLIC_SERVER_URI}${user.image}`);
            return (
              <div
                key={index}
                onClick={() => router.push(`/${user.username}/profile`)}
                className="flex gap-x-4 items-center hover:bg-zinc-200 cursor-pointer rounded-xl p-2"
              >
                <img
                  className="w-10 h-10 rounded-full border-2 border-primary"
                  src={`${process.env.NEXT_PUBLIC_SERVER_URI}${user.image}`}
                />
                <div className="flex flex-col">
                  <div className="text-lg font-bold">{user.name}</div>
                  <div className="text-sm font-light">{user.username}</div>
                </div>
              </div>
            );
          })}
        </main>
      ) : (
        inputValue !== "" && (
          <div className="min-w-[400px] h-[50px] flex justify-center items-center text-sm font-semibold bg-white rounded-xl absolute top-16 left-1/2 -translate-x-1/2">
            No results found
          </div>
        )
      )}
    </>
  );
};

export default UsersList;
