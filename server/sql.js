var Sequelize = require("sequelize");
process.env.TZ = 'Asia/Shanghai';
var sequelize = new Sequelize('rest', 'root', 'root', {
	host: '127.0.0.1',
	port: '3306',
    dialect: "mysql",
    dialectOptions: {
        charset: 'utf8mb4'
    },
	pool: {
		max: 500,
		min: 0,
		idle: 10000
	},
    timezone: process.env.TZ
});


export {
	sequelize
};