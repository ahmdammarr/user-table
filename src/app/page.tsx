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

    <div className={styles.container}>
      <h1 className={styles.header}>My Users</h1>
      <p className={styles.info}>Manage your users here</p>

      <Search />
      <UsersList users={users} />
    </div>
  );
}


const styles = {
  container: "flex min-h-screen flex-col p-24 w-full",
  header: "text-4xl font-bold text-black ",
  info: "text-lg text-black"
}


