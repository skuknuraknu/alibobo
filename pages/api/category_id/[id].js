import conn from '../../../db'
export default function handler( req, res) {
	const { id } = req.query
	// Ambil data dari server menggunakan 'query select' ❤️‍🔥
    if( req.method == "GET"){
    	conn.query(`SELECT produk.*, kategori.*,(select COUNT(*) from produk ) as TOTALPRODUK from produk INNER JOIN kategori ON kategori.id_kategory = produk.id_kategori WHERE kategori.id_kategory = ${req.query.id}`, (err, result) => {
	    if( !err && result != ""){
	       return res.status(200).json({be : "bjormil",kategory : req.query.id,data : result})
	    }
	    return res.status(200).json({error : err, msgResponse : "Jangan macam - macam dengan saya karena saya tidak macam - macam dengan anda :v"})
	    })
    }else{
    	return res.status(404).json({responseMsg : "HAYOOOOO MAU NGAPAIN LIAT LIAT API KAMI?? NANTI TERBAKAR"})
    }
  
}