// 外部
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')// 為了讀取到 req.body 的套件
const methodOverride = require('method-override')
const moment = require('moment');

// 內部
const app = express()
const port = 3000
const routes = require('./routes')
require('dotenv').config()
require('./config/mongoose')

// 引用
app.engine('hbs', exphbs({
  defaultLayout: 'main', extname: '.hbs', helpers: {
    dateFormat: function (date, format) {
      return moment(date).format(format);
    }
  }
}))
app.set('view engine', 'hbs') // 將視圖引擎設置為 Handlebars。這樣一來，當你使用 res.render 方法來呈現視圖時，Express 將使用 Handlebars 模板引擎來編譯視圖並返回給客戶端
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)


app.listen(port, () => {
  console.log(`Serve is running on http://localhost:${port}`)
})