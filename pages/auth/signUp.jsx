import {FaMailBulk ,FaKey, FaFacebook, FaInstagram} from 'react-icons/fa'
import { getProviders, signIn, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers},
  }
}

const SignUp = ({ providers }) => {
	const router = useRouter();
  const { status } = useSession();

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

	useEffect(() => {
	    if (status === "unauthenticated") {
	    	router.push("/auth/signUp");
	    } else if (status === "authenticated") {
	      	router.push("/");
	    }
	  }, [status]);

	return (
		<div className=' h-screen m-w-screen bg-abu-abu  overflow-hidden'>
		<div className="m-w-screen mx-5 h-fit pt-14">
			<div className="grid md:grid-cols-12">
				<LeftSide/>
				<RightSide providers={providers}/>
			</div>
		</div>
		</div>
		)
}
const LeftSide = () => {
	return (
		<div className="col-span-1 md:col-span-5 font-Quicksand relative">
			<div className=''>
				<img src="/images/login__page/login_image.jpg" className='hidden md:block absolute  scale-150 z-1 w-96 h-[32rem] object-cover' alt="Login__image"/>
				
			</div>
		</div>
	)
}
const RightSide = ({ providers,csrfToken }) => {
	
	const handleLogin = () => {
		console.log("daftar")
	}
	return (
		<div className="col-span-10 md:col-span-7">
			<div href='#' className='flex justify-end block'>
				<a className='bg-oren-login text-white hover:bg-ijo-login duration-300 cursor-pointer px-4 py-1 text-xl'>Login</a>
			</div>
			{/*Login input : mulai!!!*/}
			<div className='w-72 h-32 relative ml-10 sm:ml-32 mt-10'>
				<p className='text-5xl pt-5 text-pink-login'>Alibobo</p>
				<p className='text-2xl pt-2 pb-5'>Daftar sebelum belanja.</p>
				
				<form method='post' action='/api/auth/callback/credentials'>	
				<p className=''><FaMailBulk className='inline mr-1'/> Email*</p>
				<input type="text" name="username" className='mb-2 pl-5 text-sm rounded border-2 w-72 block h-10' placeholder='Masukkan alamat email kamu'/>

				<p className=''><FaMailBulk className='inline mr-1'/> Nama</p>
				<input type="text" name="password" className='mb-2 pl-5 text-sm rounded border-2 w-72 block h-10' placeholder='Masukkan nama kamu'/>

				<p> <FaKey className='inline mr-1'/>Password*</p>
				<input type="password" className='pl-5 text-sm rounded border-2 w-72 block h-10' placeholder='Masukkan password kamu'/>
				<p className='text-xs pt-2'>Saya telah menyetujui ketentuan yang berlaku pada website ini</p>
				<button onClick={handleLogin} className='bg-ijo-login w-full px-4 py-2 text-center rounded-md text-white duration-300 hover:ml-1 cursor-pointer mt-2'>DAFTAR</button>

		        <div key={providers.facebook.name}>
		          <button onClick={() => signIn(providers.facebook.id)} className="w-full py-1 rounded bg-blue-800 mt-1">
		           <FaFacebook className='text-white inline' size={24}/>
		           <span className='text-white'>Masuk dengan {providers.facebook.name}</span>
		          </button>
		        </div>
				</form>
		       

			</div>
			{/*Login input : berakhir!!!*/}
		</div>
	)
}

export default SignUp