import {FaShippingFast,FaMotorcycle,FaMoneyBillWave} from "react-icons/fa"
const Feature = () => {
	return (
		 <div className="m-10 grid grid-cols-1 md:grid-cols-3 gap-x-14 gap-y-10">
		 	<div className="px-7 py-4 border-2 border-ijo-header rounded wrap flex hover:bg-ijo-header hover:text-white duration-300">
		 		<FaShippingFast size={48} className="mr-2"/>
		 		<span className="">Gratis ongkir<br/> <span className="text-sm">ke seluruh dunia sampai isekai</span></span>
		 	</div>
		 	<div className="px-7 py-4 border-2 border-ijo-header rounded wrap flex hover:bg-ijo-header  hover:text-white duration-300">
		 		<FaMotorcycle size={48} className="mr-2"/>
		 		<span className="">Kurir Kompeten<br/> <span className="text-sm">Barang anda aman di tangan kurir kami</span></span>
		 	</div>
		 	<div className="px-7 py-4 border-2 border-ijo-header rounded wrap flex hover:bg-ijo-header  hover:text-white duration-300">
		 		<FaMoneyBillWave size={48} className="mr-2"/>
		 		<span className="">Harga Terjangkau<br/> <span className="text-sm">Harga murah meriah</span></span>
		 	</div>
		 </div>
	)
}
export default Feature