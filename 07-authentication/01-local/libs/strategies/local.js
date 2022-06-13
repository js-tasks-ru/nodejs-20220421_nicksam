const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../../models/User');

module.exports = new LocalStrategy(
  { usernameField: 'email', session: false },
  async function (email, password, done) {
    const user = await userModel.findOne({ email });
    if (!user) done(null, false, 'Нет такого пользователя');
    else {
      const check = await user.checkPassword(password);
      if (check === false) done(null, false, 'Неверный пароль');
      else done(null, user, null);
    }
    //done(null, false, 'Стратегия подключена, но еще не настроена');
  }
);
