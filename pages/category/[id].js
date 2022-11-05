import { useRouter } from "next/router"
import {FaLayerGroup,FaDatabase, FaArrowLeft} from "react-icons/fa"
// untuk pengambilan data dari api
import useSWR from 'swr'
import axios from "axios"
import Link from "next/link"

const CategoryById = () => {
	const router = useRouter()
	const { id } = router.query

	const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  	const { data, error } = useSWR(`/api/category_id/${id}`, fetcher);
  	if (!data) return 
  	const categories = data?.data
  	if(!error) console.log(categories)
	if(error) console.log(error)
		
	return (
		<div>
			<Link href="/" ><span className="hover:text-black duration-300 cursor-pointer absolute text-white py-4 px-4"><FaArrowLeft className="inline mb-1 peer-hover:text-black"/> Kembali</span></Link>
			<div className="w-full h-[35rem] bg-purple-600">
					{
						categories != null ? (
						<div className="flex justify-center items-center h-full flex-col">
						{
							categories[0]?.gambar_kategori != null ? <img src={categories[0]?.gambar_kategori} className="w-72 h-72 object-center" referrerPolicy="no-referrer" ></img> : <p>Loading</p>
								
						}
						{
								categories != null ? <p className="text-white text-2xl mt-2"><FaLayerGroup className="inline mr-3 mb-1" size={20}/>{categories[0].nama_kategori}</p>  : <p>Loading</p>
						}
					
						
						</div>
						) : ( 
						<div className="flex justify-center items-center h-full flex-col">
							<img src="/images/gif/loading.gif"/>
						</div>
						)
					}
			</div>
			<p className="px-4 py-2 text-lg pl-6">Menampilkan Kategori {categories != null ? categories[0]?.nama_kategori : `...`}</p>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mx-4 mb-4">
				{
					categories && (
						Object.values(categories).map(kategori => {
							return (
								<div className="w-full h-fit pb-2 shadow-2xl rounded-md cursor-pointer" key={kategori.id_produk}>
									<Link href={'/products/id/'+kategori.id_produk}><img src={kategori.gambar_produk} className="p-3 object-cover h-60 w-full rounded-md" referrerPolicy="no-referrer"></img></Link>
									<span className="pl-3 block">{kategori.nama_produk}</span>
									<span className="pl-3 block text-green-700">{kategori.harga}</span>
								</div>
							)
						})
					)
				}
			</div>
		</div>
	)
}
export default CategoryById