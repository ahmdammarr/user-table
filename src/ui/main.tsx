"use client"
import React, { useState } from 'react'
import { Button } from './button'
import { Table, ITableProps } from './table'

export function Main({ data }: ITableProps) {
    const [userData, setUserData] = useState(data)
    const [filterData, setfilterData] = useState('')
    const handleFilterData = () => {

    }
    return (
        <div>
            <div className='filter'>
            <input
                placeholder='search users'

            />
            <Button
                children='testsdfsdfd'
            />
            </div>
            <Table
                data={userData}
            />
        </div>
    )
}
