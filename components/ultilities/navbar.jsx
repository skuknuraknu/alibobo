import Link from "next/link"
import { useState } from "react"
import { useSession } from "next-auth/react";
import Cart from "./cart"
import CartTemp from "./cartTemp"
import ProfilePicLogo from "./profilePic"

const Navbar = () => {
	const { status, data : session } = useSession();
	return (
		<div className="flex justify-between w-full relative h-14 bg-ijo-header">
			<div className="pl-4 pt-3 ">
				<Link href='/'><a  className="text-2xl bg-yellow-400 px-4 py-1">Wangy Shop</a></Link>
				{session?.user?.email == "sempakkuda1412@gmail.com" ? 
					<Link href='/admin/home'><a  className="ml-4">Halaman admin</a></Link> : ''
				}
			</div>
			<div className="">
				<CartTemp/>
				<Cart/>
				<ProfilePicLogo />
			</div>
		</div>
	)
}
export default Navbar