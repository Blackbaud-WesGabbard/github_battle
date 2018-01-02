//IMplicit - look to left of dot
//-------------------------------
var sayNameMix = function(obj) {
  console.log(obj);
  obj.sayName = function(){

    console.log(this.name);
  };
};

var me = {
  name: 'Wes',
  age: 25
};

var you = {
  name: 'Lou',
  age: 44
}

var Person = function (name, age) {
  return {
    name: name,
    age: age,
    sayName: function(){
      console.log(this.name);
    },
    mother: {
      name: 'Staey',
      sayName: function() {
        console.log(this.name);
      }
    }
  };
};

var jim = Person('Jim', 42);
jim.sayName();
jim.mother.sayName();


//Explicit - call, apply, binding
//-------------------------------
var sayName = function(lang1, lang2, lang3){
  console.log('my name is' + this.name + lang1);
};

var stacey = {
  name: 'Stacey',
  age: 33
}

var languages = ['js,', 'ruby', 'python']

sayName.call(stacey, languages[1]);

//apply allows us to pass in array
sayName.apply(stacey, languages);

//bind - allows to set up new funciton that can be invoked later
var newFn = sayName.bind(stacey, languages[0]);
newFn();



//new Binding
var Animal = function (color, name, type){
  this.color = color;
  this.name = name;
  this.type = type;
};

var zebra = new Animal('black/white','zorro','Zebra')
console.log(zebra);