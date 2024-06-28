import React from 'react'


interface IButtonProps extends HTMLButtonElement {

}

export function Input(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className='bg-sky h-12'  {...props} />
    )
}
