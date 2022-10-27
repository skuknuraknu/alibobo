import Header from "../header"

const CatalogHeader = () => {
	return (
		<div className="w-full h-[22rem] absolute ">
			<img src="/images/product__page/banner.jpg" className="absolute object-right object-cover w-full h-80 md:h-[22rem]"/>
			<div className="absolute text-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<p className="px-6 py-4 hover:rotate-360 animate-bounce duration-300 text-center text-md md:text-3xl uppercase">Happines is not in money, but in shopping ✨</p>
			</div>
			<Header />
		</div>
	)
}
export default CatalogHeader