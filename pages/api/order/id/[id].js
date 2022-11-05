import conn from '../../../../db'

export default async function handler( req, res ) {
	if(req.method == "GET"){
		conn.query(`select * from transaksi inner join kurir on kurir.id_kurir = transaksi.id_kurir inner join produk on produk.id_produk = transaksi.id_produk where email = '${req.query.id}'`, (error, result) => {
			if(!error){
				res.status(200).json({"data" : result})
			}
			res.status(400).json({"error" : error})
		})
	}
}