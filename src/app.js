const http = require( 'http' );
const { Pool } = require( 'pg' );
const pool = new Pool();

const server = http.createServer( async ( request, response ) => {
  let result = 'OK';
  if ( request.url === '/select' ) {
    result = ( await pool.query( 'SELECT id FROM TestTable WHERE id=1' ) ).rows[ 0 ];
  } else if ( request.url === '/insert' ) {
    result = ( await pool.query( 'INSERT INTO TestTable(num) VALUES(1) RETURNING *' ) ).rows[ 0 ];
  }
  response.statusCode = 200;
  response.end( JSON.stringify( result ) );
} );

server.listen( process.env.HTTP_PORT );
