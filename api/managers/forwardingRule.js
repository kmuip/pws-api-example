module.exports=(()=>{function e({maintenance:e,multiFactor:t,service:r}){this._serviceClient=r}return e.prototype.addForwardingRule=function(e){return this._serviceClient.addForwardingRule(e)},e.prototype.updateForwardingRule=function(e){return this._serviceClient.updateForwardingRule(e)},e.prototype.deleteForwardingRule=function(e){return this._serviceClient.deleteForwardingRule(e)},e.prototype.getForwardingRuleList=function(){return this._serviceClient.getForwardingRuleList()},e})();