import conn from '../../../../db'
 import { useRouter } from 'next/router'

export default function handler( req, res) {
	const id = req.query.specificProduct
	if(req.method == "GET"){
		conn.query(`SELECT * FROM produk WHERE id_produk = ${id}`, (error, result) => {
			if(error){
				return res.json({"Error" : [error]})
			}
			return res.json({
				"data"  : result
			})
		})
	}
}