const passSymbols = (password) => {
  let hasUpperCase = false
  let hasNumber = false
  for (let i = 0; i < password.length; i++) {
    if (!Number(password[i])) {
      if (password[i].toUpperCase() === password[i]) {
        hasUpperCase = true
      }
    }
    if (Number(password[i]) || Number(password[i]) === 0) {
      hasNumber = true
    }
  }

  if(!hasUpperCase) return "Password should have upper case letter"
  if(!hasNumber) return "Password should have number in it"
  return ""
}

module.exports = (req, res, next) => {
  let email = req.body.email
  let password

  if("passwordOne" in req.body) {
    password = req.body.passwordOne
  }
  if("password" in req.body) {
    password = req.body.password
  }

  const re = /\S+@\S+\.\S+/;

  if (!re.test(email)) return res.send({success: false, message: "bad email"})
  if (password.length < 5 || password.length > 20) return res.send({
    success: false,
    message: "pass min 5, max 20 length"
  })

  const passHasError = passSymbols(password)

  if(passHasError) return res.send({success: false, message: passHasError})

  next()
}