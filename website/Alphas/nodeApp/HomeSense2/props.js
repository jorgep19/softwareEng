
// development properties
// https://stackoverflow.com/questions/5869216/how-to-store-node-js-deployment-settings-configuration-files
var props = {}
var dev = {}

dev.crypto="^1234$"
dev.db_user=process.env.DB_USER || "homesense" 
dev.db_pass=process.env.DB_PASS || "hspass" 
dev.db_name=process.env.DB_NAME || "Homesense" 
props.dev = dev

props.port=3000
module.exports = props
