import conn from '../../../../db'

export default async function handler( req, res ) {
	if(req.method == "POST"){
		conn.query(`DELETE from transaksi WHERE id_transaksi = '${req.body.id_transaksi}'`, (error, result) => {
			if(!error){
				res.status(200).json({"data" : result})
			}
			res.status(400).json({"error" : error})
		})
	}
}