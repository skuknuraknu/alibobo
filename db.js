// Mengimport package untuk berkomunikkasi dengan server database secara real time ✨
require('dotenv').config()
const mysql = require('mysql2')
	// db setup ✨
	const conn = mysql.createConnection(process.env.DATABASE_URL)
	if( !conn ){
		console.log("Error") 
	}
    /* Jika koneksi ke server basisdata gratisan sukses ✅*/
    console.log("\nConnection Succesfull Dattebayo : | PLANETSCALE MYSQL | - HAPPY CODING" ) 
    // db setup berakhir ✨
    export default conn

