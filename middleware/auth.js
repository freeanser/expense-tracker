module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '請先登入才能使用！')  // 加入這行
    res.redirect('/users/login')
  }
}

// 以下兩種寫法是一樣的意思
// 1. authenticator: (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next()
//   }
//   res.redirect('/users/login')
// }

// 2. function authenticator(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next()
//   }
//   res.redirect('/users/login')
// }

// 但是寫法 1. 可以將此函式變成物件，並以 middleware.authenticator 呼叫此函式