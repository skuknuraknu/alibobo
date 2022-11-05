import conn from '../../../db'
export default async function handler( req, res){
	
	if(req.method == "POST"){
		conn.query(`INSERT INTO keranjang (id_produk, email) VALUES('${req.body.id_produk}','${req.body.email}')`, (error, result) => {
			if(!error)
			{
				return res.status(200).json({"data" : result})
			}
			return res.status(404).json({"data" : error})
		})
		
	}
}