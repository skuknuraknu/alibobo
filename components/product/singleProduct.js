import Image from "next/image"
import {FaShippingFast,FaShoppingBasket} from 'react-icons/fa'
import useSWR from "swr"
import axios from "axios"
import { useState } from "react"
import Checkout from "./checkout"
import { useSession } from "next-auth/react"

const SingleProduct = ({product}) => {

	const fetcher   	= async (url) => await axios.get(url).then((res) => res)
	const GET_PROVINSI  = useSWR('/api/ongkir/ongkir', fetcher)
	const provinsi 		= GET_PROVINSI.data?.data.data.rajaongkir

	const { data : session } = useSession()
	const [ isCheckout, setIsCheckout ] = useState('invisible')
	const [ show, setShow] = useState('invisible')
	const [ ongkir, setOngkir] = useState('')
	const [ tujuan, setTujuan] = useState('')
	const [ etd, setEtd] = useState('')

	const getProvinsi = async () => {
		const select = document.getElementsByClassName('provinsi')[0].value
		const response = await axios.get('/api/ongkir/'+select)
			.then(res => {
				setShow('visible')
				const resp   = res.data.data.rajaongkir
				const tujuan = document.getElementsByClassName('tujuan')[0]
				const postal = document.getElementsByClassName('postal')[0]
				const ongkir = document.getElementsByClassName('ongkir')[0]
				const etd = document.getElementsByClassName('etd')[0]
				console.log(resp)
				tujuan.innerHTML = resp.destination_details.city_name
				postal.innerHTML = resp.destination_details.postal_code
				ongkir.innerHTML = '+ Rp ' + resp.results[0].costs[0].cost[0].value
				etd.innerHTML = resp.results[0].costs[0].cost[0].etd + ' Hari'
				setOngkir(resp.results[0].costs[0].cost[0].value)
				setTujuan(resp.destination_details.city_name)
				setEtd(resp.results[0].costs[0].cost[0].etd)

			})
	}

	return (
		<div className="m-10 relative" id="atas">
		<Checkout isCheckout={isCheckout} setIsCheckout={setIsCheckout} product={product} ongkir={ongkir} tujuan={tujuan} etd={etd}/>
		<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 rounded-md shadow-black-500 ">
			<div className="shadow-xl w-full h-[30rem] bg-pink-600 relative select-none">
				<Image src={product?.gambar_produk != null ? product?.gambar_produk : ''} width={200} height={200} layout="fill"/>
			</div>
			<div className="w-full h-[30rem] relative">
				<span className="text-xl text-black">{product.nama_produk}</span>
				<hr/>
				<p className="my-2"><span className="text-md font-bold">168,5 RB </span> Penilaian | <span className="text-md font-bold">10RB+ </span>Terjual | <span className="text-md font-bold">{product.stok} </span>Stok tersedia</p>
				<p className="pl-4 pr-20 py-4 bg-slate-200">
				<span className="mr-4 text-lg line-through">Rp 72.000</span>
				<span className="font-bold text-2xl text-orange-500">{product.harga}</span>
				</p>
				<p className="mt-5 px-7 py-2 bg-yellow-400 inline-block"><FaShippingFast size={30} className="inline mr-2"/>Pengiriman</p>
				<p className="mt-2 mb-2 px-4 py-1 text-white bg-indigo-900 w-fit">Pilih provinsi :</p>
				<select className="provinsi mb-2 w-72" name="provinsi" onChange={getProvinsi}>
					{
					provinsi != null && (
						Object.values(provinsi.results).map(item => {
							return <option key={item.city_id} value={item.city_id}>{item.city_name}, {item.province}</option>
							})
						)
					}
					</select>
					<div className={`${show} pl-4 pr-20 py-4 bg-slate-200`}>
					<span className={`tujuan text-md text-slate-500`}></span> | <a className="postal"></a>
					<span className={`ongkir pl-4 font-bold text-2xl text-orange-500`}></span>
					<div className="">
						<span className="inline">Estimasi sampai = </span>
						<span className={`etd font-bold text-xl text-red-500`}></span>
					</div>
					<div className="px-4 py-1 bg-red-500 text-white mr-4 w-fit">
						<FaShippingFast className="inline mr-2"/>
						<span className="inline">JNE REGULER</span>
					</div>
					</div>
					<div className="w-full my-2">
						<div onClick={() => setIsCheckout('visible')} className={product.stok == 0 ? 'invisible': `mt-2 cursor-pointer duration-300 hover:text-white w-full`}><a href="#atas" className="hover:bg-black w-full text-center block bg-yellow-400 px-4 py-3"><FaShoppingBasket size={30} className="mr-2 inline"/>CHECKOUT</a></div>

							<div onClick={ async () => {
						const data = {
							id_produk : product.id_produk,
							email : session?.user?.email
						}
						await axios({ method : "POST", url: '/api/keranjang/keranjang', data : data}).then(res => {
								alert("BERHASIL MENYIMPAN PESAN")
							}).catch(error => alert("GAGAL MENYIMPAN PESAN"))
					}} className=" mt-2 cursor-pointer duration-300 hover:text-white"><a className="hover:bg-black w-full text-center block bg-sky-400 px-4 py-3"><FaShoppingBasket size={30} className="mr-2 inline"/>+ KERANJANG</a></div>
					</div>
					</div>
				</div>
				<DeskripsiProduk product={product}/>
			</div>
	)
}
const DeskripsiProduk = ({product}) => {
	return (
		<div className="bg-slate-200 mt-40 pt-2 relative">
			<span className="text-xl font-bold pl-4 mt-2">Deskripsi Produk</span>
			<hr/>
				<pre className="w-full p-4">{product.deskripsi}</pre>
		</div>
	)
}
export default SingleProduct