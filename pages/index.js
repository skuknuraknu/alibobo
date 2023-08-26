import Head from 'next/head'
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import Catalog from './catalog';
import Image from 'next/image';
// import component

export default function Home() {

const router = useRouter();
    const { status } = useSession();
    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/auth/signIn");
      } else if (status === "authenticated") {
          router.push("/");
      }
    }, [status]);

  const { data: session } = useSession();
  console.log(session)
  return (
    <div>
      {!session ? (
        <div className='flex justify-center items-center'>
          <Image src="/images/login__page/loading.gif" width={300} height={300} className="" layout='responsive'/>
        </div>
      ) : (
       <>
        <Catalog/>
       </>
        )}
    </div>
  )
}
