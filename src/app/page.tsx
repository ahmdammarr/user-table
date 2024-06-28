import { Main } from "@/ui";


export default async function Home() {
  const res = await fetch('https://dummyjson.com/users');
  const data = await res.json();


  const tableData = data?.users?.map((user) => {
    const { gender, firstName, lastName, birthDate, email } = user
    return {
      fullName: `${firstName} ${lastName}`,
      db: birthDate,
      email,
      gender,
      role: 'admin'

    }
  })

  return (
    <main className="main">
      <div className="container">
        <h1>Users</h1>
        
        <Main data={tableData} />
      </div>
    </main>
  );
}
