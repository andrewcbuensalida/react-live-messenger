const redisClient = require("../../redis");

const dm = async (socket, message) => {
	// TODO should probably save to postgres too
	message.from = socket.user.userid;
	// to.from.content
	const messageString = [message.to, message.from, message.content].join(".");

	await redisClient.lpush(`chat:${message.to}`, messageString); // to is userid
	await redisClient.lpush(`chat:${message.from}`, messageString); // from is userid

	socket.to(message.to).emit("dm", message);
};

module.exports = dm;
