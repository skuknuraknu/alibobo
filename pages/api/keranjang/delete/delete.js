import conn from '../../../../db'

export default async function handler( req, res ) {
	if(req.method == "POST"){
		conn.query(`DELETE from keranjang WHERE id_keranjang = '${req.body.id_keranjang}'`, (error, result) => {
			if(!error){
				res.status(200).json({"data" : result})
			}
			res.status(400).json({"error" : error})
		})
	}
}