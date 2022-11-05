import conn from '../../../../db'
export default async function handler( req, res){
	
	if(req.method == "POST"){
		conn.query(`UPDATE transaksi set catatan_penjual = '${req.body.catatan}' WHERE id_transaksi = '${req.body.id_transaksi}'`, (error, result) => {
			if(!error)
			{
				return res.status(200).json({"data" : result})
			}
			return res.status(404).json({"data" : error})
		})
		
	}
}