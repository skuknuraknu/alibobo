import Navbar from '../../components/ultilities/navbar'
import Footer from '../../components/footer'
import { useSession } from "next-auth/react"
import axios from "axios";
import useSWR from "swr";
import Image from 'next/image';
import Link from 'next/link'
import {FaTrashAlt} from "react-icons/fa"
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Keranjang = () => {

	const { status, data: session } = useSession();
	const router = useRouter()
    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/auth/signIn");
      } else if (status === "authenticated") {
       
      }
    }, [status]);

	const fetcher = async (url) => await axios.get(url).then(res => res)
	const { data, error } = useSWR('/api/keranjang/id/'+session?.user?.email, fetcher)
	if(!data?.data?.data) return 

	return (
		<div className=''>
			<Navbar />
			<div className='mx-10 mt-5 mb-[30rem]'>
				<p className="bg-yellow-400 px-4 py-2 inline">Keranjang saya :</p>
				<div className='grid grid-cols-3 gap-4'>
				{
					Object.values(data?.data?.data).map((item, index) => {
						return (
							<div key={index} className="w-full h-fit mt-4 relative cursor-pointer">
								<Link href={`/products/id/${item.id_produk}`}><Image src={item.gambar_produk} width={400} height={400} layout="responsive" className='rounded'/></Link>
								<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
									<p className='bg-black text-white px-1 py-2'>{item.nama_produk}</p>
								</div>
								<FaTrashAlt size={25} className="absolute top-0 right-0 m-2 text-red-500" onClick={ async () => {
									const data = {
										id_keranjang : item.id_keranjang
									}
									await axios({ method : "POST", url: '/api/keranjang/delete/delete', data : data}).then(res => {
										alert("BERHASIL MENGHAPUS KERANJANG")
										router.push(`/keranjang/${session?.user?.email}`)
										}).catch(error => alert("GAGAL MENGHAPUS KERANJANG"))
								}}/>
							</div>
						)
					})
				}
				</div>
			</div>
			<Footer />
		</div>
	)
}
export default Keranjang;