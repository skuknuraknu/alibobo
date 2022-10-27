// untuk pengambilan data dari api
import useSWR from 'swr'
import axios from "axios"
import Link from 'next/link'
import Script from 'next/script'

const CatalogCategory = () => {
	const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  	const { data, error } = useSWR("/api/category", fetcher);
	
	if(!error) console.log(data?.data)
	if(error) console.log(error)
	const categories = data?.data

	return (
		<div className="absolute mt-[23rem] w-full h-72  px-10">
		{/*cols*/}
		<p className='px-4 py-1 bg-indigo-900 mb-2 text-white w-fit'> Kategori </p>
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 relative">		
		
				{/*Cek apakah data yang dikirmkan dari server tersedia*/}
				{categories != null ? (
					Object.values(categories).map(kategori => {
						return (
							<div key={kategori?.id_kategory} className="cursor-pointer relative h-56 w-full shadow-xl rounded">
								<Link href={`/category/${kategori.id_kategory}`}><img key={kategori.id_kategory} src={kategori?.gambar_kategori} className="peer w-full h-56 object-cover" referrerPolicy="no-referrer" /></Link>
								<Link href={`/category/${kategori.id_kategory}`}>
									<p className={`hover:visible hover:scale-125 -skew-y-12 duration-300 absolute px-4 py-1 bg-yellow-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>{kategori?.nama_kategori}</p>
								</Link>
								
							</div>
						)
					})
				) : (
				<div className="flex justify-center items-center h-full flex-col">
					<img src="/images/gif/loading.gif"/>
				</div>
				)}
		</div>
		<div className="relative w-full h-32 bg-red-500 pb-20">

		</div>
		</div>
	)
}
export default CatalogCategory