import {
	FaWindowClose,FaPlusSquare,
	FaCarAlt,FaMinusSquare,
	FaPhone,} from 'react-icons/fa'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import axios from 'axios'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Checkout = ({isCheckout,setIsCheckout, product, ongkir, tujuan, etd }) => {

	const hargaProduct = [...product.harga.split('Rp ')][1].replace(/[.]/g,'')
	const totalHarga = new Intl.NumberFormat('id-ID').format(parseInt(hargaProduct) + parseInt(ongkir))

	return (
		<div className={`${isCheckout} w-fit md:w-[40rem] left-15 h-fit lg:left-40 lg:w-fit bg-white shadow-xl absolute z-20`}>
			<div className="flex justify-between">
				{/* ✅ Header*/}
				<div></div>
				<div>
					<FaWindowClose size={30} className={`cursor-pointer hover:scale-110 text-ijo-header m-2`} onClick={() => {setIsCheckout('invisible')}}/>
				</div>
			</div>
			{/* ✅ Body checkout */}
			<div className='relative'>
				<p className='flex justify-center text-black text-xl uppercase bg-ijo-header px-4 py-2'>Checkout Product</p>
			<div className='grid grid-cols-1 lg:grid-cols-2'>
				<GridOne product={product} totalHarga={totalHarga} ongkir={ongkir}/>
				<GridTwo product={product} tujuan={tujuan} totalHarga={totalHarga} etd={etd}/>
			</div>

			</div>
		</div>
	)
}

const GridOne = ({ product, totalHarga, ongkir}) => {

	return (
	<div className='min-w-full p-5 h-[30rem]'>
			<Image src={product.gambar_produk} width={420} height={340} fill="cover" className="relative rounded-md"/>
			<p><span className='text-md bg-ijo-header px-4 py-1'>{product.nama_produk}</span></p><br/>
			<p><span className='text-xl mt-2'>{product.harga} +</span> <span className="text-red-600">Ongkir({ongkir})</span></p>
			 {ongkir == "" ? 'Silahkan memilih alamat pengiriman terlebih dahulu' : (
				<span>= Rp { totalHarga } <span className='px-4 py-1 bg-red-600 text-white text-xs'>COD</span></span>
				) }  
		</div>
	)
}

const GridTwo = ({ product, tujuan, totalHarga, etd }) => {
	const [ nohp, setNohp ] = useState('')
	const [ kurir, setKurir ] = useState('')
	const [ alamat, setAlamat] = useState('')
	const { status, data : session } = useSession()
	const [ stok, setStok ] = useState(0)

	const router = useRouter();
    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/auth/signIn");
      } else if (status === "authenticated") {
          
      }
    }, [status]);

	return (
		<div className='pt-5 pl-5 pr-5'>
			<p className=' mb-2'>Di kirim ke : <span className='px-4 py-1 bg-slate-200'>{ tujuan == '' ? 'Pilih alamat kirim' : tujuan}</span></p>
			<label className='bg-yellow-400 px-4 py-1 inline-block w-fit'>Masukkan alamat lengkap pengiriman anda : </label>
			<textarea onChange={(e) => setAlamat(e.target.value)} className='alamat block w-full  border-black border-2 rounded mt-2 text-sm p-3 mb-2'></textarea>

			<span className='bg-yellow-400 px-4 py-1 inline-flex'><FaPhone size={15} className="mt-1 mr-1 "/>Nomor HP :</span>
			<input type="number" onChange={(e) => setNohp(e.target.value)} name="no-hp" className="mt-2 w-full border-2 border-black block"/>

			<p className='mt-2'>Pilih kurir</p>
			<select name='kurir' className='w-full border-2 rounded border-black block' onChange={(e) => {setKurir(e.target.value)}}>
				<option value='-'>...</option>
				<option value={1}>Muhammad Fathany</option>
				<option value={2}>Haeriskal Kamil</option>
				<option value={3}>Muhammad Rayhan</option>
			</select>
			<p className='mt-2'>Jumlah pesanan [{product.stok} tersedia :)]</p>
			<div className='flex pb-2'>
				<p><FaMinusSquare className='mt-2 cursor-pointer mx-1' size={25} onClick={() => {stok == 0 ? setStok(0) : setStok(stok - 1)}}/></p>
				<p className='select-none text-2xl'>{ stok <= 0 ? 0 : stok}</p>
				<p><FaPlusSquare className='mt-2 cursor-pointer mx-1' size={25} onClick={() => {stok >= product.stok ? stok : setStok(stok + 1)}}/></p>
			</div>

			<button onClick={ async () => {
				const data = { 
					"nama"  	: session?.user?.name,
					"email" 	: session?.user?.email,
					"id_produk" : product.id_produk,
					"kurir"		: kurir,
					"alamat"    : alamat,
					"no_hp"		: nohp,
					"biaya"		: totalHarga,
					"etd"			: etd,
					"stok"		: stok
				}
				await axios({ method : "POST", url: '/api/order/order', data : data}).then(res => {
					alert("SUKSES MEMBUAT PESANAN")
				}).catch(error => console.log(error))
			}} className='px-4 py-1 bg-yellow-400 flex justify-center mt-5 hover:bg-black select-none hover:text-white cursor-pointer w-full mb-2'><FaCarAlt size={25} className="mr-2"/>PESAN SEKARANG</button>
		</div>
	)
}
export default Checkout