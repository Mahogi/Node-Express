const users = []

module.exports = {
  getAll: () => users,
  addOne: (user) => users.push(user),
}