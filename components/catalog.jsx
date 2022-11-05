import { useTimer } from 'react-timer-hook';
import Feature from './ultilities/feature';
import CatalogFlash from './catalog/catalog__flash'
import CatalogCategory from './catalog/catalog_category'
import Footer from './footer'
import CatalogCourier from './catalog/catalog__kurir'
const Catalogs = () => {
 
	const time = new Date();
  time.setSeconds(time.getSeconds() + 12200); // 10 minutes timer
	
	return (
		<div className='mt-5 w-full h-screen relative'>
      <Feature />
			<MyTime expiryTimestamp={time}/>
			<CatalogFlash />
      <CatalogCategory />
      <CatalogCourier />  
      <Footer />
		</div>
	)
}
function MyTime({expiryTimestamp}) {
  const {
    seconds,
    minutes,
    hours,
    ampm,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  return (
      <div className=''>
      	<span className='ml-10 bg-yellow-300  rounded px-4 py-2 m-2'>FLASH SALE</span>
        <span className='text-xl bg-pink-500 px-1 text-center text-white'>{hours}</span>:
        <span className='text-xl bg-indigo-500 px-1 text-center text-white'>{minutes}</span>:
        <span className='text-xl bg-sky-500 px-1 text-center text-white'>{seconds}</span>
      </div>
  );
}

export default Catalogs