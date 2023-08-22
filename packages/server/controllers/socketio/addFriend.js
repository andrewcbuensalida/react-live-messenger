const redisClient = require("../../redis");
const pool = require("../../db");

const addFriend = async (socket, friendName, cb) => {
	// cb comes from react
	if (friendName === socket.user.username) {
		cb({ done: false, errorMsg: "Cannot add self!" });
		return;
	}
	let friend = await redisClient.hgetall(`userid:${friendName}`);
	const currentFriendList = await redisClient.lrange(
		`friends:${socket.user.username}`, // key of the array
		0, // start
		-1 // end
	);
	// if no friend in redis, check postgres as well
	if (!friend.userid) {
		const result = await pool.query(
			"SELECT id, username, passhash, userid FROM users u WHERE u.username=$1",
			[friendName]
		);
		if (result?.rowCount > 0) {
			friend = result?.rows[0];
		}
	}
	if (!friend.userid) {
		cb({ done: false, errorMsg: "User doesn't exist!" });
		return;
	}
	if (
		currentFriendList &&
		currentFriendList.indexOf(`${friendName}.${friend.userid}`) !== -1
	) {
		cb({ done: false, errorMsg: "Friend already added!" });
		return;
	}

	// TODO should probably add to postgres as well
	await redisClient.lpush(
		`friends:${socket.user.username}`,
		[friendName, friend.userid].join(".")
	);

	const newFriend = {
		username: friendName,
		userid: friend.userid,
		connected: friend.connected,
	};
	cb({ done: true, newFriend });
};

module.exports = addFriend;
