module.exports=(()=>{function e({maintenance:e,multiFactor:r,service:t}){this._serviceClient=t}return e.prototype.registerProgressToken=function(e,r){return this._serviceClient.registerProgressToken(e,r)},e.prototype.unregisterProgressToken=function(e){return this._serviceClient.unregisterProgressToken(e)},e.prototype.getCurrentUserProgressTokens=function(){return this._serviceClient.getCurrentUserProgressTokens()},e})();