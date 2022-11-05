import conn from '../../../db'
export default function handler( req, res) {
	const { id } = req.query
	// Ambil data dari server menggunakan 'query select' ❤️‍🔥
    if( req.method == "GET"){
    	conn.query(`SELECT * from produk INNER JOIN kategori ON kategori.id_kategory = produk.id_kategori WHERE produk.id_kategori = ${req.query.id}`, (err, result) => {
	    if( !err ){
	       return res.status(200).json({data : result})
	    }
	    return res.status(200).json({error : err, msgResponse : "Jangan macam - macam dengan saya karena saya tidak macam - macam dengan anda :v"})
	    })
    }else{
    	return res.status(404).json({responseMsg : "HAYOOOOO MAU NGAPAIN LIAT LIAT API KAMI?? NANTI TERBAKAR"})
    }
  
}