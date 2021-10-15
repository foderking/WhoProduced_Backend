var express = require('express'); // Express web server framework
require('dotenv').config()
var cors = require('cors');
var app = express();
var morgan = require('morgan')

const Search = require('./routes/search')
const Track = require('./routes/track')
// const RootRouter = require('./routes/index')
const NotFound = require('./routes/not_found')

const LOG = require('./utils/logger')
const { ValidateReq }  = require('./middleware/validate_request')
const { Errors } = require('./middleware/errors')


app
  .use(express.json())
  .use(cors())

	.use(morgan(':method :url from :remote-addr. :status - :response-time : :total-time ms'))
	// .use(morgan('dev'))
	.use(ValidateReq)

	.use('/search', Search)
	.use('/id', Track)
	// sever endpoints should start with /api the rest will be depreciated
	.use('/api/search', Search)
	.use('/api/track', Track)

	// .use(RootRouter)
	.use(NotFound)
	.use(Errors)


app.listen(8888);
LOG('Listening on 8888');