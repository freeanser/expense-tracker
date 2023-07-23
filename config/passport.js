const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

module.exports = app => {
  // 這些 app.use 等初始化動作，以前都習慣寫在 app.js 裡，這裡由於建立了專門的 passport 設定檔，我們就拉到設定檔裡來統一管理
  // 初始化
  app.use(passport.initialize()) // 初始化 Passport 模組，使其能夠在 Express 應用中使用
  app.use(passport.session()) // 初始化 Passport 的 Session 功能，這允許 Passport 保持用戶登入的狀態，並管理用戶會話
  // 設定本地登入策略
  //  { usernameField: 'email' }把驗證項目改成 email
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // done 是一個回調函式，用於指示身份驗證的結果
    User.findOne({ email })
      .then(user => {
        if (!user) {
          // done(null驗證過程沒有錯誤, false找不到使用者, info)
          return done(null, false, { message: 'That email is not registered!' })
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Email or Password incorrect.' })
        }
        // done(null, user找到使用者，將使用者物件傳給 done)
        return done(null, user)
      })
      // done(err驗證過程出現錯誤, false找不到使用者)
      .catch(err => done(err, false))
  }))
  // 設定序列化與反序列化
  // passport.serializeUser將使用者登入時的使用者物件，轉換成識別資訊並儲存在 Session 中

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  // passport.deserializeUser接著將存入 Session 中的那筆識別資訊再度提出(user 資訊)，轉換成需要渲染在頁面的使用者物件
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user)) // 取出的 user 資訊，之後會放在 req.user 裡以供後續使用
      .catch(err => done(err, null))
  })
}