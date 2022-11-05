require('dotenv').config()
const mysql = require('mysql2')
// db setup ✨
const conn = mysql.createConnection(process.env.DATABASE_URL)

export default function handler( req, res) {
	if(req.method == "GET"){
		conn.query("SELECT * FROM produk WHERE flash_sale ='YES'", (error, result) => {
			if(error){
				return res.json({"Error" : [error]})
			}
			return res.json({
				"quotes hari ini": "Jangan lupa beribadah",
				"pesan" : "API telah siap :)... Ittadakimas",
				"data"  : result
			})
		})
	}
	
}