'use strict';
var path = require('path');
function MultiDir(options){
  this.baseDir = "";

  if(options.hasOwnProperty("baseDir")){
    this.baseDir = path.join(process.cwd(), options.baseDir, "/");
  }
}


MultiDir.prototype.apply = function(compiler) {
  var baseDir = this.baseDir;

  var newEntry = {};
  var entry = compiler.options.entry;
  // console.log(params);
  Object.keys(entry).map(function(key){
    var ents = entry[key];
    for(var i = 0; i < ents.length; i++){
      var e = ents[i];
      var p = e.replace(baseDir, "").replace('.coffee', '');
      newEntry[p] = [e];
    }
  });
  compiler.options.entry = newEntry;
};


module.exports = MultiDir;
