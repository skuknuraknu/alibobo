import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"
import Navbar from '../../components/ultilities/navbar'
import useSWR from "swr";
import axios from "axios"
import Image from "next/image";

const Admin = () => {
	const router = useRouter();
	const { data : session } = useSession()
	
	useEffect(() => {
		if(session?.user?.email != "ahmaadm84112@gmail.com"){
			alert("ANDA BUKAN ADMIN")
			router.push('/')
		}
	},[])
	const catatan = useRef()
	const [ pesan, setPesan ] = useState('')
	const fetcher = async (url) => await axios.get(url).then(res => res)
    const { data, error } = useSWR('/api/order/order/', fetcher)
	if(!data?.data?.data) return 
	console.log(data?.data?.data)
	
	return (
		<div className="min-w-full h-screen">
			<Navbar />
			<p className="bg-yellow-400 px-4 py-1 inline-block rounded mx-10 my-4">DAFTAR PESANAN KUSTOMER</p>
			<div className="mx-10 grid grid-cols-1 gap-4 relative h-fit">
				{
					Object.values(data?.data?.data).map(item => {
						return (
							<div className="w-full h-fit bg-white shadow-xl" key={item.id_transaksi}>
								<div className="grid grid-cols-1 lg:grid-cols-3 ">
									<Image src={item.gambar_produk} width="200" height="200" layout="responsive" className="rounded"/>
										<div className="">
										<p className="bg-indigo-800 mb-4 text-white px-4 py-1 block">Detail Pemesanan :</p>
											<p className="pl-3 text-xl mr-4 ">{item.nama_produk}</p>
											<p className="pl-3 text-green-700 mr-4 ">{item.biaya}</p>
											<p className="pl-3 text-md mr-4">Di antar oleh : {item.nama_kurir}</p>
											<pre className="mr-4 mb-3 bg-slate-200 p-2 text-sm ml-3">{`${item.alamat}`}</pre>
										</div>
								<div className="mb-10">
									<p className="bg-indigo-900 text-white px-4 py-1 block">Catatan Penjual:</p>
									<textarea onChange={(e) => setPesan(e.currentTarget.value)} type="text" className="resize-none h-56 border-2 border-black rounded w-full mt-2 px-1">{item.catatan_penjual}</textarea>
									<button className="w-full bg-indigo-900 text-white px-4 py-1" onClick={ async () => {
										data = {
											id_transaksi : item.id_transaksi,
											catatan : pesan,
										}
										await axios({ method : "POST", url: '/api/order/catatan/catatan', data : data}).then(res => {
										alert("BERHASIL MENYIMPAN PESAN")
										}).catch(error => alert("GAGAL MENYIMPAN PESAN"))
									}}>SIMPAN</button>
								</div>
								</div>
							</div>
						)
					})
				}
			</div>
		</div>
	)
}
export default Admin