import { useEffect, useState, useRef, useContext } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Router, useRouter } from "next/router";
import { UserContext } from "../state/userContext";
import Link from "next/link";

const Header = () => {
	const router = useRouter();
	const { status, data : session } = useSession();
	const [ clicked, setClicked ] = useState(false)

useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/auth/signIn");
      } else if (status === "authenticated") {
          console.log("Hoorraayyyyy")
      }
    }, [status]);

	return (
	<div className="w-fit sm:w-full h-[27rem] relative ">
		<span className="absolute bg-yellow-400 px-6 py-3 text-2xl m-5">Alibobo</span>

			<div className="absolute text-2xl m-5 right-0">
			<button onClick={() => setClicked(prev => !prev)} className="peer w-16 h-16 rounded-full bg-indigo-900 shadow-xl cursor-pointer relative">
			<img src={session?.user?.image} className="object-fit w-24 rounded-full"/>
			{ clicked &&
			<div className="w-fit h-fit py-2 px-4 bg-white absolute right-0 mt-4 rounded-md ">
				<div>
					<a className="block text-sm">{session?.user?.email}</a>
					<hr/>
				</div>
				<div>
					{session?.user?.email == "ahmaadm84112@gmail.com" ? 
					<Link href='/admin/home'><a  className="text-lg hover:text-sky-500">Halaman admin</a></Link> : ''
				}
				</div>
				<div>
				<Link href={`/keranjang/${session?.user?.email}`}><a className="block text-lg hover:text-sky-500">Keranjang</a></Link>
				</div>
				<div>
					<Link href={`/order/${session?.user?.email}`}><a className="block text-lg hover:text-sky-500">Pesanan saya</a></Link>
				</div>
				<div onClick={signOut}>
					<a className="block text-lg hover:text-sky-500">Logout</a>
				</div>
			</div>
			}
			</button>
		</div>
		<span className="absolute top-1/2 left-1/2 text-2xl md:text-3xl text-white -translate-x-1/2 -translate-y-1/2">Happines is not in money, but in shopping ✨</span>
		<img src={'/images/product__page/banner.jpg'} className="w-full h-full object-right object-cover"/>
	</div>
	)
}

const ModalAdmin = ({ modalAdmin }) => {
	const passRef = useRef(null);
	const router = useRouter()

	return (
		<div className={`${modalAdmin} absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-20 w-fit h-fit bg-white shadow-xl p-10`}>
			<h2>Masukkan password admin :</h2><br/>
			<input ref={passRef} type="password" placeholder="password admin" className="w-full border-2 p-2 border-black"/>
			<button onClick={() => {
				if(passRef.current.value == "admin123"){
					router.push('/admin/home')
				}
			}} className="bg-indigo-900 text-white p-2 w-full mt-2">Masuk</button>
		</div>
	)
}
export default Header