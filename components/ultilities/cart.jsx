import {FaBoxOpen} from "react-icons/fa"
import useSWR from "swr"
import axios from "axios"
 import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Link from "next/link"

const Cart = () => {
	const { status, data: session } = useSession();
	const fetcher = async (url) => await axios.get(url).then(res => res)
	const data = useSWR('/api/order/id/'+session?.user?.email, fetcher)
	const [ cartCount, setCartCount ] = useState(0)

	useEffect(() => {
		if(data?.data?.data?.data){
			setCartCount(Object.keys(data?.data?.data?.data).length)
		}
	}, [data])

	return (
		<div  className="relative">
			<Link href={'/order/' + session?.user?.email}>
			<div className="absolute pt-3 right-32">
			<span  className="bg-yellow-400 text-sm px-1 right-2 top-1 absolute rounded-xl">{cartCount}</span>
			<FaBoxOpen size={30} className="text-white cursor-pointer duration-300 hover:text-black"/></div>
			</Link>
		</div>
	)
}
export default Cart