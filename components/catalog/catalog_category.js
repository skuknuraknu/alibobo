import useSWR from "swr"
import axios from "axios"
import Link from "next/link"

const CatalogCategory = () => {
	const fetcher = async (url) => await axios.get(url).then((res) => res)
	const { data, error } = useSWR('/api/category', fetcher)
	console.log(data?.data?.data)

	return (
		<div className="max-w-full h-fit mt-3">
		<span className='ml-10 bg-yellow-300 rounded px-4 py-2 m-2'>KATERGORI</span>
			<div className="m-10 grid grid-cols-6 md:grid-cols-12 gap-x-5 gap-y-3 mt-10">
			{
				data?.data != null ? (
				Object.values(data?.data?.data).map(item => {
					return (
						<div className="relative flex m-2 justify-center max-w-full max-h-full col-span-6" key={item.id_kategory}>
						<span className="absolute top-1/2 px-4 py-2 bg-yellow-300 duration-300 hover:-skew-y-12 hover:px-12 hover:shadow-2xl shadow-sky-500">{item.nama_kategori}</span>
							<Link href={'/category/'+item.id_kategory}><img src={item.gambar_kategori} className="cursor-pointer w-96 h-96 object-cover rounded "/></Link>
							<span className="inline-flex text-xl font-bold">{item.nama_kategory}</span>
							<span className="block">{item.harga}</span>
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
export default CatalogCategory