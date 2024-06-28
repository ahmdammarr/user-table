'use server'

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    birthDate: string;
    role: string;
}


export const getUsers = async (keyword?: string) => {
    try {
        const res = await fetch('https://dummyjson.com/users');
        const data = await res.json();
        const usersData = data?.users?.map((user: IUser, index: number) => {
            return {
                fullName: user?.firstName + ' ' + user?.lastName,
                gender: user.gender,
                birthDate: user?.birthDate,
                email: user?.email,
                role: index % 2 === 0 ? 'Admin' : 'Moderator'
            }
        })
        const filteredUsers = usersData?.filter((user: typeof usersData) => {
            if (user?.fullName.toLocaleLowerCase().includes(keyword?.toLocaleLowerCase())) {
                return user
            }
        })
        return keyword ? filteredUsers : usersData
    }
    catch {
        return 'error'
    }
}