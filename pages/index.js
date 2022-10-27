import Head from 'next/head'
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
// import component
import Catalog from './category/catalog';

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
  return (
    <div>
      {!session ? (
        <div className='flex justify-center items-center'>
          <span>Mohon bersabar ini ujian......Redirecting....</span>
          <img src="/images/login__page/loading.gif" className=""/>
        </div>
      ) : (
       <>
        <Catalog/>
       </>
        )}
    </div>
  )
}
