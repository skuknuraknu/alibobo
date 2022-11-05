import {FaMailBulk, FaLinkedin, FaKey, FaFacebook, FaInstagram} from 'react-icons/fa'
import { getProviders, signIn, useSession } from "next-auth/react"
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

const Login = ({ providers }) => {

		const router = useRouter();
    const { status } = useSession();
    
    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/auth/signIn");
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
const RightSide = ({ providers }) => {
	return (
		<div className="col-span-10 md:col-span-7">

			{/*Login input : mulai!!!*/}
			<div className='w-72 h-32 relative ml-10 sm:ml-32 mt-10'>
				<p className='text-5xl pt-5 text-pink-login'>Alibobo</p>
				<p className='text-2xl pt-2 pb-5'>Login sebelum belanja.</p>

		        <div key={providers.facebook.name}>
		          <button onClick={() => signIn(providers.facebook.id)} className="w-full py-1 rounded bg-blue-800 mt-1">
		           <FaFacebook className='mr-2 text-white inline' size={24}/>
		           <span className='text-white'>Masuk dengan {providers.facebook.name}</span>
		          </button>
		        </div> 
		        <div key={providers.linkedin.name}>
		          <button onClick={() => signIn(providers.linkedin.id)} className="w-full py-1 rounded bg-blue-800 mt-1">
		           <FaLinkedin className='mr-2 text-white inline' size={24}/>
		           <span className='text-white'>Masuk dengan {providers.linkedin.name}</span>
		          </button>
		        </div>
		       

			</div>
			{/*Login input : berakhir!!!*/}
		</div>
	)
}
export default Login