require('dotenv').config()
// db setup ✨
export default function handler( req, res) {
	const mysql = require('mysql2')
	const conn = mysql.createConnection(process.env.DATABASE_URL)
	const id = req.query.specificProduct
	if(req.method == "GET"){
		conn.query(`SELECT * FROM produk WHERE id_produk = ${id}`, (error, result) => {
			if(error){
				return res.send({"Error" : [error]})
			}
			return res.status(200).send({
				"data"  : result
			})
		})
	}
}