import conn from '../../../../db'

export default async function handler( req, res ) {
	conn.query(`SELECT * FROM kurir WHERE id_kurir = ${req.query.id}`, (error, result) =>  {
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