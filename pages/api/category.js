import conn from '../../db'
export default function handler( req, res) {
	// Ambil data dari server menggunakan 'query select' ❤️‍🔥
    if( req.method == "GET"){
    	conn.query("SELECT * FROM kategori", (err, result) => {
	    if( !err ){
	       return res.status(200).json({be : "bjormil",data : result})
	    }
	    return res.status(200).json({error : err})
	    })
    }else{
    	return res.status(404).json({responseMsg : "HAYOOOOO MAU NGAPAIN LIAT LIAT API KAMI?? NANTI TERBAKAR"})
    }
  
}