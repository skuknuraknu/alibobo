import Footer from "../../components/footer"
import Navbar from "../../components/ultilities/navbar"
import { useSession } from "next-auth/react";
import axios from "axios";
import useSWR from "swr";
import Image from "next/image";
import { useRouter } from "next/router"
import {FaTrashAlt,FaThumbsUp} from "react-icons/fa"

const OrderAccount = () => {
	const router = useRouter()
	const { data : session } = useSession()
    const fetcher = async (url) => await axios.get(url).then(res => res)
    const response = useSWR('/api/order/id/'+session?.user?.email, fetcher)
    const detailOrder = response?.data?.data?.data
    if(!detailOrder) return
    	
	return (
		<div>
			<Navbar />
			<div className="p-10 mb-[22rem]">
				<p className="text-2xl bg-yellow-400 px-4 py-2">Daftar pesanan anda :</p>
				<div className="bg-white h-fit  pb-10">
					<div className="w-full h-fit relative">
					{
					detailOrder && (
						Object.values(detailOrder).map((item, index) => {
							return (
							<div key={index} className="relative grid grid-cols-6 md:grid-cols-12 border-bottom border-2 border-black mb-2 mt-2">
								<div className="m-3 col-span-2 ">
									<Image src={`${item.gambar_produk}`} width={200} height={200} className=""/>
									<FaTrashAlt size={20} onClick={ async () => {
										const data = {
											id_transaksi : item.id_transaksi
										}
										await axios({ method : "POST", url: '/api/order/delete/delete', data : data}).then(res => {
										alert("BERHASIL MENGHAPUS PESANAN")
										router.push(`/order/${session?.user?.email}`)
										}).catch(error => alert("GAGAL MENGHAPUS PESANAN"))
									}}/>

									</div>
									<div className="m-3 col-span-5">
									<p className="text-xl mb-2">{`${item.nama_produk}`} : {item.stok_pesan} [{item.status_transaksi == 'YES' ? 'Barang sudah Diterima' : 'Barang belum di terima'}]</p>
									<span className="">Alamat Pengiriman :</span>
									<pre className="mb-3 bg-slate-200 p-2 text-sm">{`${item.alamat}`}</pre>
									<span className="block mb-2">Perkiraan paket sampai : {item.etd} hari</span>
									<span className="px-4 py-2 bg-red-500 text-xl mt-2 text-white">Rp {item.biaya}</span>
									<p className="mt-2 bg-sky-500 px-4 py-1 text-white w-fit" onClick={ async () => {
										await axios({ method : "POST", url: '/api/order/update/update', data : {id_transaksi : item.id_transaksi}}).then(res => {
										alert("BERHASIL MENGONFIRMASI PESANAN")
										}).catch(error => alert("GAGAL MENGONFIRMASI PESANAN"))
									}}><FaThumbsUp className="mb-1 inline"/>Konfirmasi pesanan</p>
									</div>
									<div className="m-3 col-span-5">
									<span className="bg-yellow-400 px-4 py-1 inline-block mb-2">Kurir</span>
										<div className="grid grid-cols-6 gap-x-3">
											<div className="relative w-full h-fit col-span-2">
												<Image src={item.gambar} width={100} height={100} layout={"responsive"} className="rounded"/>
											</div>
											<div className="col-span-4">
											<span className="text-sm block pt-2 underline">{item.nama_kurir}</span>
											<span className="text-sm font-bold block">Performa kurir : {item.performa}</span>
											<span className="text-sm  block">Kendaraan kurir : {item.kendaraan}</span>
											<i className="text-sm">Catatan penjual : </i>
											<pre className="mt-1 mb-3 bg-slate-200 p-2 text-sm">{item.catatan_penjual == null ? 'Tidak ada catatan dari penjual' : item.catatan_penjual}</pre>
												</div>
											</div>
										</div>
									</div>
											)
										})
									)
								}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}
export default OrderAccount