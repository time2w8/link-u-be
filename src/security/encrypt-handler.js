const bcript = require('bcryptjs');

const sec_handler = {};

sec_handler.encript = async (password) => {

    const salt = await bcript.genSalt(15);
    const hash = await bcript.hash(password, salt);
    return hash;

}

sec_handler.isValidPassword = async (password, user_password) => {

    const isValid = await bcript.compare(password, user_password);
    return isValid;
}

module.exports = sec_handler;