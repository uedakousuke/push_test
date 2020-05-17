//expressをロードして、
const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const Subscriber = require("./models/subscriber");
//express-ejs-layoutsモジュールをロード
const layouts =require("express-ejs-layouts");
//mongooseをロード
const mongoose =
require("mongoose");
//データベース接続を設定
mongoose.connect(

    "mongodb://localhost:27017/recipe_db",
    {useNewUrlParser: true}
);
//データベースをdb変数に代入
const db =mongoose.connection;
db.once("open",() => {
    //「Mongooseを使ってMongoDBに接続できました！」
    console.log("Successfully connected to MongoDB using Mongoose!")
});
//mongoose.Schemaで新しいスキーマを作る
const subscriberSchema =
mongoose.Schema({
    name: String, //スキーマのプロパティを追加
    email: String,
    zipCode: Number
});

//新しいSubscriberを実体化する
var subscriber1 = new Subscriber({
    name:"Jon Wexler",
    email:"jon@jonwexler.com"
});
//Subscriberをデータベースに保存する
subscriber1.save((error,savedDocument) => {
    //エラーがあれば次のミドルウェア関数に渡す
    if(error) console.log(error);
    //保存したドキュメントをログに出す
    console.log(savedDocument);
});

var myQuery =Subscriber.findOne({
    name:"Jon Wexler"
})
.where("email",/wexler/);

//クエリを実行し、コールバック関数でエラーとデータを処理する
myQuery.exec((error,data) => {
    if(data) console.log(data.name);
});
//本文の解析でURLエンコーディングとJSONパラメータの処理を行う
app.use(
    express.urlencoded({
         extended:false
    }) 
     ); 
     app.use(express.json());
//expressアプリケーションを実体化する

app.set("port",process.env.PORT || 3000);
//ホームページの経路を作る
app.get("/",(req,res) => {
    res.send("Welcome to Confetti Cuisine!");
    });

//ejsの使用をアプリケーションに設定
app.set("view engine", "ejs");
app.use(layouts);

app.use(express.static("public"))
//コースページと連絡ページと、連絡フォーム送出のために経路を追加
app.get("/courses",homeController.showCourses);
app.get("/contact",homeController.showSignUP);
app.post("/contact",homeController.postedSignUpForm);
//エラー処理用にミドルウェア関数を追加
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);
//アプリケーションがポート3000を監視するように設定
app.listen(app.get("port"),()=> {
    console.log(`Server running at http://localhost:${app.get("port")}`
    );
});

