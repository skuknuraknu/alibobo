import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const ProfilePicLogo = () => {

	const { status, data : session } = useSession();
	const [ clicked, setClicked ] = useState(false)

	return <button onClick={() => setClicked(prev => !prev)} className="peer w-10 h-10 rounded-full shadow-xl cursor-pointer relative mr-5 mt-1">
			<img src={session?.user?.image} className=" rounded-full"/>
			{ clicked &&
			<div className="w-fit h-fit py-2 px-4 bg-white absolute right-0 mt-4 rounded-md z-10">
				<div>
					<a className="block text-sm">{session?.user?.email}</a>
					<hr/>
				</div>
				<div>
					<Link href={`/keranjang/${session?.user?.email}`}><a className="block text-md">Keranjang</a></Link>
				</div>
				<Link href={'/order/' + session?.user?.email} className="block text-lg">Pesanan anda</Link>
				<div onClick={signOut}>
					<a className="block text-lg">Logout</a>
				</div>
			</div>
			}
			</button>
}
export default ProfilePicLogo