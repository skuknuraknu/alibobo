import useSWR from "swr"
import axios from 'axios'
import Link from "next/link"
import Image from "next/image"

const CatalogFlash = () => {
	/* START SWR */
	const fetcher = async (url) => await axios.get(url).then((res) => res.data)
	const { data, error } = useSWR('/api/catalog/flash_sale', fetcher)
	
	if(!error) console.log(data?.data)
	if(error) console.log(error)

	return (
		<div className="m-10 max-w-full h-fit mt-3">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5">
			{
				data?.data != null ? (
				Object.values(data?.data).map(item => {
					return (
						<div className="w-full h-full shadow-xl p-5 bg-white" key={item.id_produk}>
							<Link href={'/products/id/'+ item.id_produk}><Image src={item.gambar_produk} className="cursor-pointer object-cover rounded peer" width={200} height="200" layout="responsive"/></Link>
							<div className="flex justify-center flex-col items-center">
								<span className="text-md bg-black text-white px-4 py-1 ">{item.nama_produk}</span>
							<span className="block">{item.harga}</span>
							</div>
						</div>
					)
				})
				) : (
					console.log("error")
				)
			}
			</div>
		</div>
	)
}
export default CatalogFlash