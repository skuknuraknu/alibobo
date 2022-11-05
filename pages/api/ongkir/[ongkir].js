const RajaOngkir = require('rajaongkir-nodejs').Starter(process.env.RAJAONGKIR);
export default async function handler(req,res){
	if(req.query.ongkir == "ongkir" && req.method == "GET"){
		RajaOngkir.getCities().then(function (result){
   		 	return res.status(200).json({data : result})
		}).catch(function (error){
		    return res.status(404).json({data : 'error'})
		});
	}else{
		var params = {
		    origin: 21, // ID Kabupaten aceh
		    destination: req.query.ongkir, // ID Kota atau Kabupaten Tujuan
		    weight: 1700 // Berat Barang dalam gram (gr)
		};
		RajaOngkir.getJNECost(params).then(function (result){
		    return res.status(200).json({data : result, query : req.query.ongkir})
		}).catch(function (error){
		    return res.status(404).json({data : error})
		});
		
	}
}
