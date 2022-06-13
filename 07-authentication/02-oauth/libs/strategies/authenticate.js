const user = require('../../models/User');

module.exports = async function authenticate(
  strategy,
  email,
  displayName,
  done
) {
  console.log('email', email);
  if (!email) return done(null, false, 'Не указан email');
  const result = await user.findOne({ email });

  if (result) {
    return done(null, result, null);
  } else {
    let newUser = new user();
    newUser.email = email;
    newUser.displayName = displayName;

    try {
      await newUser.save();
    } catch (e) {
      return done(e, false, null);
    }
    console.log('newUser', newUser);
    return done(null, newUser, null);
  }
};
