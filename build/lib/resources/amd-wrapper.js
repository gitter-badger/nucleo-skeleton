
var define = AMD.define;
var requirePackage = AMD.require;

/*

AMD define should be inside a wrapper with try and catch

define = function(){
  
  try {
    
    AMD.define.apply(this, arguments);
    
  } catch(error){
    
    console.log(error);
    
  }
  
};

*/
