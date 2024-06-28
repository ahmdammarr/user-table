import { getUsers } from "@/services/users/getUsers";
import "./globals.css";

import Search from "@/ui/search";
import { UsersList, NormUser } from "@/ui/users-list";



interface HomeProps {
  searchParams: { searchkeyword: string }
}
export default async function Home({ searchParams: { searchkeyword } }: HomeProps) {

  const users = await getUsers(searchkeyword) as NormUser[]

  return (

    <div className="flex min-h-screen flex-col p-24 w-full">
      <h1 className="text-4xl font-bold text-black ">My Users</h1>
      <p className="text-lg text-black">Manage your users here</p>

      <Search />
      <UsersList users={users} />
    </div>
  );
}


