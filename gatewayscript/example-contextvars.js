// set variable to the input context
session.input.setVar('myInputVar', {myInputValue: 4});

// get variable from the input context
var myInputVar = session.input.getVar('myInputVar'); // {myInputValue: 4}

// create a context named `myContext` if not exist
var ctx = session.name('myContext') || session.createContext('myContext');

// set/get/delete variable on the named context
ctx.setVar('myContextVar', 'myValue');

var myContextVar1 = ctx.getVar('myContextVar');	// "myValue"

ctx.deleteVar('myContextVar');

var myContextVar2 = ctx.getVar('myContextVar');	// undefined

session.output.write({
	myInputVar: myInputVar,
	myContextVar1: myContextVar1,
	myContextVar2: myContextVar2 || null
});
