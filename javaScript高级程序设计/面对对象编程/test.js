// //6.1理解对象
// //创建一个Object实例
// var person = new Object();
// //创建了三个属性（name,age,job）;
// person.name = 'anluhou';
// person.age = '23';
// person.job = 'frondEnd';
// //创建了一个方法(sayName());
// person.sayName = function(){
//     alert(this.name);
// }

// //对象字面量创建对象（首选模式）
// var person = {
//     name: 'anluhou',
//     age: '23',
//     job: 'frondEnd',

//     sayName: function(){
//         alert(this.name);
//     }
// };

//6.1.1属性类型

//1.数据属性  可配置的[[Configurable]], 可枚举的[[Enumerable]], 可写的[[Writable]] , 数据值[[Value]];
//对于直接在对象上定义的属性，它们的数据属性都被设置为true。

//修改属性默认的特性， Object.definePropert();
var person = {};
Object.defineProperty(person,'name',{
    writable: false,
    value: 'anluhou'
});
console.log((person.name));//"anluhou"
person.name = 'wj';//writable为false 无法修改属性的值 在严格模式下会抛出错误
console.log((person.name));//"anluhou" 

//[[Configurable]]一旦为false，不能再把它变回可配置的，此时再调用Object.defineProperty()方法除修改writable之外的特性都会抛出错误
// var person = {};
// Object.difineProperty(person, 'name', {
//     configurable: false,
//     value: 'anluhou'
// });

//抛出错误
// Object.difineProperty(person, 'name', {
//     configurable: true,
//     value: 'anluhou'
// });

//在调用Object.difineProperty()创建一个新的属性时，如果不指定，configurable,enumerable,writable特征的默认值是false。 
//如果调用Object.difineProperty()方法知识修改已定义的的属性的特性，则无此限制。

//2.访问器属性 （不包含数据值，包含一对儿getter,setter函数，不过这两个函数不是必需的）
//[[Configurable]], [[Enumerable]], [[Get]](在读取属性是调用的函数，默认为undefined), [[Set]] (在写入属性是调用的函数，默认为undefined)。

//访问器属性不能直接定义，必须使用Object.defineProperty()来定义。
// var wj = {
//     _year: 2017, //_下划线用于表示只能通过对象访问的属性。
//     age: 22
// };
// Object.defineProperty(my,'year',{
//     get: function(){
//         return this._year;
//     },
//     set: function(newValue){
//         if(newValue>2017){
//             this._year = newValue;
//             this.age += newValue - 2017;
//         }
//     }
// });
// my.year = 2018;
// alert(my.age);

//6.1.2定义多个属性 方法:Object.defineProperties();
// var wj = {};
// Object.difineProperties(wj,{
//     //定义了两个属性（_year和age）
//     _year:{
//         writable: true,
//         value: 2017
//     },
//     age:{
//         writable: true,
//         value: 22
//     },
//     //定义了一个访问器属性（year）
//     year:{
//         get: function(){
//             return this._year;
//         },
//         set: function(newValue){
//             if(newValue>2017){
//                 this._year = newValue;
//                 this.age += newValue - 2017;
//             }
//         }
//     }
// });

//6.1.3读取属性的特性 方法：Object.getOwnPropertyDescriptor(). 可以取得给定属性的描述符。
var wj = {};
Object.defineProperties(wj,{
    _year:{
        value: 2017
    },
    age:{
        value: 22
    },
    year:{
        get: function(){
            return this._year;
        },
        set: function(newValue){
            if(newValue>2017){
                this._year = newValue;
                this.age += newValue - 2017;
            }
        }
    }
});

// var descriptor = Object.getOwnPropertyDescriptor(wj,'_year');
// alert(descriptor.value);//2017
// alert(descriptor.configurable);//false
// alert(typeof descriptor.get);//undefined

// var descriptor = Object.getOwnPropertyDescriptor(wj,'year');
// alert(descriptor.value);//undefined
// alert(descriptor.configurable);//false
// alert(typeof descriptor.get);//'function'

 //6.2创建对象 虽然Object构造函数或对象字面量都可以用来创建单个对象，但这些方式有个明显的缺点：使用同一个接口创建很多对象，会产生大量的重复代码。
//6.2.1工厂模式 无法解决对象识别的问题（即怎样知道一个对象的类型）。
// function createPerson(name,age,job){
//     var o = new Object();
//     o.name = name;
//     o.age = age;
//     o.job = job;
//     o.sayName = function(){
//         alert(this.name);
//     };
//     return o;
// }
// var person1 = createPerson('anluhou',23,'frontEnd');
// var person2 = createPerson('wj',18,'student');
// 

//6.2.2构造函数模式 1.没有显式地创建对象。 2.直接将属性和方法赋值给了this对象。 3.没有return语句
// function Person(name,age,job){//构造函数始终都以大写字母开头
//     this.name = name;
//     this.age = age;
//     this.job = job;
//     this.sayName = function(){
//         console.log((this.name));
//     }
// }
// Person.prototype.sayName = function(){//指向同一个内存
//     alert(this.name);
// };

var person1 = new Person('anluhou',23,'frontEnd');
var person2 = new Person('wj',18,'student');

//这两个对象都有一个constructor（构造函数）属性
// alert(person1.constructor == Person);//true

// //这个例子创造的所有对象既是Object的实例，同时也是Person的实例。
// alert(person1 instanceof Object);//true
// alert(person1 instanceof Person);//true
//创建自定义的构造函数意味着将来可以将它的实例表示为一种特定的类型。

//1.将构造函数当作函数
//任何函数只要通过new操作符来调用，那它就可以作为构造函数。

//当作构造函数调用
var person = new Person('wujie',23,'frontEnd');
// person.sayName();//'wujie'
//作为普通函数调用
Person('wujie',23,'frontEnd');//添加到window
// window.sayName();
//在另一个对象的作用域调用
var o = new Object();
Person.apply(o,['wujie',23,'frontEnd']);
o.sayName();

//2.构造函数的问题（就是每个方法都要在每个实例上重新创造一遍）。
function Person(name,age,job){//构造函数始终都以大写字母开头
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = new Function('alert(this.name)');//与声明函数在逻辑上是等价的
}
//从这个角度看，每个Person实例都包含一个Function实例。 不同实例上的实名函数是不想等的。
//alert(person1.sayName == person2.sayName); //false

//通过把函数转移到构造函数外部来解决这个问题。
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}

function sayName(){
    console.log(this.name);
}

//6.2.3原型模式
//1.理解原型对象
//只要创建了一个新函数，就会为该函数创建一个prototype属性，这个属性指向函数的原型对象。
// console.log(Person.prototype.isPrototypeOf(person1));//true
// function Person() {};
//       Person.prototype.name = 'anluhou'
//       var person1 = new Person();
//       var person2 = new Person();
//       person1.name = 'wujie';
//       console.log(person1.name);//'wujie' 来自实例
//       console.log(person2.name);//'anluhou' 来自原型
//       delete person1.name;//完全删除实例属性
//       console.log(person1.name);//'anluhou' 来自原型
//hasOwnProperty()方法可以检测一个属性是存在于实例中，还是原型中。只在给定属性存在于实例对象中，才会返回true。

//原型与in操作符
function hasPrototypeProperty(object,name){
    return !object.hasOwnProperty(name) && (name in object);
}
//var k = Object.keys(Person.prototype);
//console.log(k);//'name,age,job,sayName';
//var person2 = new Person();
//person2.name = 'wujie';
//var k1 = Object.keys(person2);
//console.log(k1);//'name'
//var k = Object.getOwnPropertyNames(Person.prototype);//得到所有实例属性，无论是否可枚举。
//console.log(k);//'constructor,name,age,job,sayName';

//3.更简单原型写法 (constructor属性不再指向Person了，指向Object构造函数)。
function Person(){}
Person.prototype = {
    name: 'anluhou',
    age: '23',
    job: 'frontEnd',
    sayName: function(){
        alert(this.name);
    }
};
console.log(friend instanceof Person);//true
console.log(friend.constructor == Person);//false
console.log(friend.constructor == Object)//true

//如果constructor的值很重要，可以这么写：
// Person.prototype = {
//     constructor: Person,
//     name: 'anluhou',
//     age: '23',
//     job: 'frontEnd',
//     sayName: function(){
//         alert(this.name);
//     }
// };
// console.log(friend.constructor == Person);//true

//重设构造函数，只适用于ECMAscript5兼容的浏览器
Object.defineProperty(Person.prototype,'constructor',{
    enmuerable: false,
    value: Person
})

//4.原型的动态性
//我们对原型对象所做的任何修改都能够立即从实例上反应出来
var friend = new Person();
Person.prototype.sayHi = function(){
    console.log('hi');
};
friend.sayHi();
//如果是重写整个原型对象，那么情况就不一样了。实例中的指针指向原型，而不是构造函数。