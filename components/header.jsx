import { signOut, useSession } from "next-auth/react"
import { Menu } from '@headlessui/react'
import React, { useState } from 'react';
import Link from "next/link";
import {FaKey, FaShoppingCart, FaUserCircle} from 'react-icons/fa'

const Header = () => {
	const [show, setShow] = useState(false);
	const { data : session } = useSession()
	return (
		<div className="w-full h-16 mt-4">
			<div className="flex justify-between">
				<div className="relative">
					<p className="mt-3 text-xl md:text-2xl px-4 md:px-8 bg-yellow-400 text-black py-3 -skew-x-12 ml-5 hover:skew-x-0 duration-300"><FaShoppingCart className="inline mr-2"/>MY SHOP</p>
				</div>
				<div className="relative flex w-20 mt-3">
						<button onClick={() => setShow(prev => !prev)} className="w-14"><img src={session?.user.image} className="rounded-full w-11 inline" alt="profile"/></button>
      					{show && 
						<div className="mt-12 bg-sky-600 text-white shadow-xl w-40 mt-2 absolute right-8 rounded py-1">
	      					<div className="hover:text-black duration-300 inline-block w-full cursor-pointer">
	      						<FaUserCircle className="inline text-white mr-2 ml-10" size={14}/>
	      						<button onClick={() => signOut()} className="inline text-center">Profil</button>
	      					</div>
	      					<div className="hover:text-black duration-300 inline-block w-full cursor-pointer">
	      						<FaKey className="inline text-white mr-2 ml-10" size={14}/>
	      						<button onClick={() => signOut()} className="inline text-center">Logout</button>
	      					</div>
						</div>
      					}
				</div>
				
				
				
			</div>
		</div>
	)
}
export default Header