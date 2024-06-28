import React from 'react'

export interface NormUser {
    id: string
    fullName: string
    gender: string
    birthDate: string
    email: string
    role: 'Admin' | 'Moderator'
}

export const UsersList = ({ users }: { users: NormUser[] }) => {
    return (
        <div className={styles.container}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.head}>Full Name</th>
                            <th className={styles.head}>Gender</th>
                            <th className={styles.head}>Date Of Birth</th>
                            <th className={styles.head}>Email</th>
                            <th className={styles.head}>Role</th>
                            <th className={styles.head}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className={styles.body}>
                        {users?.map((user) => {
                            const {
                                id,
                                birthDate,
                                email,
                                fullName,
                                gender,
                                role
                            } = user
                            const isAdmin = role === 'Admin'
                            return <tr key={id}>
                                <td className={styles.rowItem}>{fullName}</td>
                                <td className={styles.rowItem}>{gender}</td>
                                <td className={styles.rowItem}>{birthDate}</td>
                                <td className={styles.rowItem}>{email}</td>
                                <td className={styles.rowItem}>
                                    <span className={`${styles.role} ${isAdmin ? styles.admin : styles.mod}`}>{role}</span>
                                </td>
                                <td className={styles.rowItem}>Actions</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const styles = {
    container: "container mt-2.5",
    tableContainer: "table-container overflow-x-auto",
    table: "min-w-full table-auto",
    head: "px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
    body: "bg-white divide-y-12 divide-grey",
    rowItem: "border-y-4 px-6 py-4 whitespace-nowrap text-gray-500",
    role: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
    admin: "bg-red-100 text-red-800",
    mod: "bg-green-100 text-green-800"
}