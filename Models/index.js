// import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
  foreignKey: 'User_username',
});

User.hasMany(Post, {
  foreignKey: 'User_username',
});

User.hasMany(Comment, {
  foreignKey: 'User_username',
});


module.exports = {
  User,
  Post,
  Comment,
};
