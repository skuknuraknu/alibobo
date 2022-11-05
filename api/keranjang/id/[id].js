import conn from '../../../../db'

export default async function handler( req, res ) {
	conn.query(`SELECT * FROM keranjang INNER JOIN produk ON produk.id_produk = keranjang.id_produk WHERE email = '${req.query.id}'`, (error, result) =>  {
		if(error){
			return res.status(404).json({
				"data" : error
			})
		}
		return res.status(200).json({
			data : result
		})
	})
	
}