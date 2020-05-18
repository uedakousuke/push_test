//個々の経路のためにコールバック関数を追加
exports.showCourses= (req,res) => {
    res.render("courses");
}; 
exports.showSignUP = (req,res) => {
    res.render("contact");
};
exports.postedSignUpForm = (req,res) => {
    res.render("thanks");
};
//コースの配列を定義
const courses = [
    {
        title:"Event Driven Cakes",
        cost:50
    },
    {
        title:"Asynchronous Artichoke",
        cost:25
    },
    {
        title:"Object Oriented Orange Juice",
        cost: 10
    }
];

exports.showCourses = (req,res) => {
    res.render("courses", {
        //コースの配列をビューに渡す
        offeredCourses: courses
    });
};
