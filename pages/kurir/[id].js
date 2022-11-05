import { useSession } from "next-auth/react";
import axios from "axios";
import useSWR from "swr";
import Image from "next/image";
import Footer from "../../components/footer"
import Navbar from "../../components/ultilities/navbar"
import { useRouter } from "next/router";

const Kurir = () => {
	const { data : session } = useSession()
	const router = useRouter()
    const fetcher = async (url) => await axios.get(url).then(res => res)
    const response = useSWR('/api/kurir/id/'+router.query.id, fetcher)
    const detailKurir = response?.data?.data?.data
    if(!detailKurir) return
    console.log(detailKurir)
	return (
		<div>
			<Navbar />
			<div className="w-full h-[32rem] mt-[10rem] mb-[10rem] bg-slate-100 flex justify-center items-center flex-col">
				<div className="w-fit h-fit">
					<Image src={detailKurir[0]?.gambar} width="300" height="300"/>
					<p className="flex justify-center text-2xl uppercase">{detailKurir[0]?.nama_kurir}</p>
					<span className="flex justify-center bg-red-500 text-white px-3 py-1">{detailKurir[0]?.performa}</span>
				</div>
				<div className="bg-slate-200 p-5 mx-32 mt-5">
				<p>Nomor hp : {detailKurir[0]?.no_hp}</p>
				<p className="text-sm">{detailKurir[0].deskripsi_kurir}</p>
				</div>
			</div>
			<Footer />
		</div>
	)
}
export default Kurir