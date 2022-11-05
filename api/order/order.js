import conn from '../../../db'
export default async function handler( req, res){
	if(req.method == "GET"){
		conn.query(`select * from transaksi inner join kurir on kurir.id_kurir = transaksi.id_kurir inner join produk on produk.id_produk = transaksi.id_produk`, (error, result) => {
			if(!error){
				res.status(200).json({"data" : result})
			}
			res.status(400).json({"error" : error})
		})
	}
	if(req.method == "POST"){
		conn.query(`INSERT INTO transaksi (id_produk,id_kurir,tgl_transaksi,status_transaksi,alamat,created_at,no_hp,email,nama,biaya, etd, stok_pesan) VALUES(${req.body.id_produk},${req.body.kurir}, NOW(), 'NO', '${req.body.alamat}', NOW(), ${req.body.no_hp},'${req.body.email}' ,'${req.body.nama}', '${req.body.biaya}', '${req.body.etd}', '${req.body.stok}')`, (error, result) => {
			if(!error)
			{
				conn.query(`UPDATE produk set stok = (stok - '${req.body.stok}') WHERE id_produk = '${req.body.id_produk}'`, (error, result) => {
				if(!error)
				{
					return res.status(200).json({"status" : "ok", "data" : result})
				}
			})
				return res.status(200).json({"status" : "ok", "data" : result})
			}
			
			return res.status(404).json({"status" : "not ok", "data" : error})
		})
		
	}
}