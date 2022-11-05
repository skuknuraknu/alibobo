import axios from "axios"
import useSWR from "swr"
import { useRouter } from "next/router"
import Navbar from "../../../components/ultilities/navbar"
import Footer from "../../../components/footer"
import SingleProduct from "../../../components/product/singleProduct"

const SpecificProduct = () => {
	const router = useRouter()
	const id = router.query.id

	const fetcher 		  = async (url) => axios.get(url).then((res) => res)
	const { data, error } = useSWR('/api/catalog/id/' + id, fetcher)
	const product         = data?.data?.data != null ? data?.data?.data[0] : null
	if(!product) return
		
	return (
		<div>
			<Navbar />
			<SingleProduct product={product}/>
			<Footer />
		</div>
	)
}
export default SpecificProduct