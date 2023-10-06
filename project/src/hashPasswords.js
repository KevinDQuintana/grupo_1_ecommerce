const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

function readUsersDB() {
	return JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'users.json'), 'utf-8'))
}

function writeUsersDB(data) {
	return fs.writeFileSync(path.join(__dirname, 'data', 'users.json'), JSON.stringify(data, null, '\t'));
}

const users = readUsersDB();

for (let user of users) {
	user.password = bcrypt.hashSync(user.password, 10);
}

console.log(users);

writeUsersDB(users);
