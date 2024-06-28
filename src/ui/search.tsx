'use client'
import { useParams, usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'

export default function Search() {
  const { push } = useRouter()
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState('')


  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!keyword) {
      params.delete("searchkeyword");
      push(pathname + "?" + params.toString());
    }
  }, [keyword])

  const onSearch = useCallback(
    () => {
      const params = new URLSearchParams(searchParams.toString());
      if (keyword) {
        params.set("searchkeyword", String(keyword));
      }
      push(pathname + "?" + params.toString());
    },
    [keyword])

  return (

    <div className='flex min-h-12 w-[500px] justify-between align-center items-center mt-3' >
      <div className="w-3/4 relative border-2 border-light-black rounded h-12 px-2">
        <div className='absolute top-2 right-2'>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_65_23)">
              <path d="M20.71 19.29L17.31 15.9C18.407 14.5025 19.0022 12.7767 19 11C19 9.41778 18.5308 7.87107 17.6518 6.55547C16.7727 5.23988 15.5233 4.2145 14.0615 3.609C12.5997 3.0035 10.9911 2.84507 9.43928 3.15375C7.88743 3.46243 6.46197 4.22436 5.34315 5.34318C4.22433 6.462 3.4624 7.88746 3.15372 9.43931C2.84504 10.9912 3.00347 12.5997 3.60897 14.0615C4.21447 15.5233 5.23985 16.7727 6.55544 17.6518C7.87103 18.5308 9.41775 19 11 19C12.7767 19.0022 14.5025 18.407 15.9 17.31L19.29 20.71C19.383 20.8038 19.4936 20.8782 19.6154 20.9289C19.7373 20.9797 19.868 21.0058 20 21.0058C20.132 21.0058 20.2627 20.9797 20.3846 20.9289C20.5064 20.8782 20.617 20.8038 20.71 20.71C20.8037 20.6171 20.8781 20.5065 20.9289 20.3846C20.9797 20.2628 21.0058 20.132 21.0058 20C21.0058 19.868 20.9797 19.7373 20.9289 19.6155C20.8781 19.4936 20.8037 19.383 20.71 19.29ZM5 11C5 9.81335 5.3519 8.65331 6.01119 7.66661C6.67047 6.67992 7.60755 5.91088 8.7039 5.45676C9.80026 5.00263 11.0067 4.88381 12.1705 5.11532C13.3344 5.34683 14.4035 5.91828 15.2426 6.75739C16.0818 7.59651 16.6532 8.66561 16.8847 9.82949C17.1162 10.9934 16.9974 12.1998 16.5433 13.2961C16.0892 14.3925 15.3201 15.3296 14.3334 15.9889C13.3467 16.6481 12.1867 17 11 17C9.4087 17 7.88258 16.3679 6.75736 15.2427C5.63214 14.1175 5 12.5913 5 11Z" fill="#8B98A6" />
            </g>
            <defs>

            </defs>
          </svg>
        </div>
        <input
          className="text-black h-full w-3/4"
          placeholder='Search'
          onChange={(e) => {
            setKeyword(e.target.value)
          }}
        />
      </div>
      <button
        onClick={onSearch}
        className='ml-3 text-white bg-blue hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-3 w-[170px]' >Search</button>
    </div>


  )
}
