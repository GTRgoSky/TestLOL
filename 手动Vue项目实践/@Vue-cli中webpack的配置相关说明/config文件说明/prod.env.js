'use strict'
const ENV = process.argv.splice(2)[0] || 'production';//local production
module.exports = {
	NODE_ENV: `"${ENV}"`
}