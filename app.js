// 外部
const express = require('express')
const session = require('express-session')
// 載入passport設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')// 為了讀取到 req.body 的套件
const methodOverride = require('method-override')
const flash = require('connect-flash')


// 內部
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes')
require('dotenv').config()
require('./config/mongoose')
require('handlebars-helpers')()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 引用
app.engine('hbs', exphbs({
  defaultLayout: 'main', extname: '.hbs', helpers: {
    dateFormat: function (date, format) {
      return moment(date).format(format);
    }
  }
}))
app.set('view engine', 'hbs') // 將視圖引擎設置為 Handlebars。這樣一來，當你使用 res.render 方法來呈現視圖時，Express 將使用 Handlebars 模板引擎來編譯視圖並返回給客戶端
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  // 放在 res.locals 裡的資料，所有的 view 都可以存取
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})
app.use(routes)


app.listen(PORT, () => {
  console.log(`Serve is running on http://localhost:${PORT}`)
})