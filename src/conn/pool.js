import mysql from 'mysql'
import keys from './keys.js'
import { promisify } from 'util'

const pool = mysql.createPool(keys)

pool.getConnection((error, conn) => {
	if (error) {
		if (error.code === 'ECONNREFUSED') {
			console.error('Conexión a base de datos rechazada')
			console.error(`Error code: ${error.code}`)
			return
		}

		if (error.code === 'PROTOCOL_CONNECTION_LOST') {
			console.error('Conexión a base de datos cerrada')
			console.error(`Error code: ${error.code}`)
			return
		}

		if (error.code === 'ER_CON_COUNT_ERROR') {
			console.error('La base de datos tiene muchas conexiones')
			console.error(`Error code: ${error.code}`)
			return
		}
	}

	if (conn) {
		console.log('DB is connected!')
		conn.release()
		return
	}
})

pool.query = promisify(pool.query)

export default pool