const bcrypt = require('bcrypt');

const pass1 = 'password';
// const pass2 = bcrypt.hashSync(pass1, 10);
const pass2 = '$2b$10$6ZYH5/AhPeVPhjyke18ma.xvxwl08o3O06W4ootJqD7ei4yUFCuSm';

// console.log(`Password 1: ${pass1}`);
// console.log(`Password 2: ${pass2}`);

const result = bcrypt.compareSync(pass1, pass2);

console.log(result);
