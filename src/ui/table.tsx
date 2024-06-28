'use client'
import React from 'react'

export interface ITableProps extends React.ButtonHTMLAttributes<HTMLTableElement> {
  data: {
    gender: string,
    fullName: string,
    db: string,
    email: string,
    role: string
  }[]
}

export function Table({ data, ...props }: ITableProps) {
  console.log('tableData', data);

  return (
    <table className="table-fixed " {...props}>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>gender</th>
          <th>DB</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ db, email, fullName, gender, role }) => {
          return (<tr className='row'><th>{fullName}</th>
            <td><div className='row'>{email}</div></td>
            <td><div>{gender}</div></td>
            <td><div>{db}</div></td>
            <td><div>{role}</div></td>
          </tr>)
        })}

      </tbody>
    </table>
  )
}
