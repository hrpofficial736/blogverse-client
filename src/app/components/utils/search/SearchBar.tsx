import React, { useEffect, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import debounce from "lodash.debounce";
import fetchUsers from "@/app/utils/functions/fetchUsers/fetchUsers";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { searchInputState, usersState } from "@/app/recoil/searchUsersStates";
import { myDataAtom } from "@/app/recoil/myDataAtom";

const SearchBar: React.FC = () => {
  const [input, setInput] = useRecoilState(searchInputState);
  const setUsers = useSetRecoilState(usersState);
  const myDataValue = useRecoilValue(myDataAtom);
  const [showComponent, setShowComponent] = useState(false);
  useEffect(() => {
    if (myDataValue.blogs.length > 0) {
      setShowComponent(true);
    }
  }, [myDataValue]);
  const fetchUsersFromServer = useMemo(
    () =>
      debounce(async (input: string) => {
        try {
          const fetchUsersResponse = await fetchUsers(input);
          if (fetchUsersResponse) {
            setUsers(fetchUsersResponse);
          } else {
            setUsers([]);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
          setUsers([]);
        }
      }, 300),
    [setUsers],
  );

  useEffect(() => {
    if (input) {
      fetchUsersFromServer(input);
    } else {
      setUsers([]);
    }
  }, [input, fetchUsersFromServer]);

  return (
    <>
      {showComponent ? (
        <div className="row-span-2 relative min-w-[275px] max-w-[350px] lg:min-w-[400px] lg:max-w-[450px] max-h-fit flex justify-center items-center text-zinc-500 focus-within:text-zinc-700">
          <IoSearch size={20} className="absolute left-2 text-inherit" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="w-full max-w-[400px] pr-3 pl-10 py-2
                 bg-zinc-200 border-none rounded-lg ring-2
                  ring-zinc-200 placeholder-zinc-500 max-md:text-sm
                   text-black font-semibold focus:ring-zinc-500 focus:placeholder-zinc-700 focus:outline-none"
            placeholder="Search for users on BlogVerse"
          />
        </div>
      ) : null}
    </>
  );
};

export default SearchBar;
