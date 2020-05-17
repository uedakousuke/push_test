// subscriberモジュールをロードする
const Subscriber =
require("../models/subscriber");

//データを次のミドルウェア関数に渡すため、getAllSubscribersをエクスポートする
exports.getAllSubscribers = (req,res,next) => {
//findによって、Subscriberモデルに対するクエリを発行
Subscriber.find( {}, (error,Subscribers) => {
    //エラーは次のミドルウェア関数に渡す
    if(error) next(error);
    //MongoDBから返されたデータをrequestオブジェクトに設定する
    req.data = subscribers;
    //次のミドルウェア関数に進む
    next();
});
};