module.exports=(()=>{function t({maintenance:t,multiFactor:e,service:i}){this._serviceClient=i}return t.prototype.getTags=function(t){return this._serviceClient.getTags(t)},t.prototype.addDataFavorite=function(t){return this._serviceClient.addDataFavorite(t)},t.prototype.removeDataFavorite=function(t){return this._serviceClient.removeDataFavorite(t)},t.prototype.getTagListFilter=function(t){return this._serviceClient.getTagListFilter(t)},t.prototype.addTag=function(t,e){return this._serviceClient.addTag(t,e)},t.prototype.updateTag=function(t,e){return this._serviceClient.updateTag(t,e)},t.prototype.deleteTag=function(t){return this._serviceClient.deleteTag(t)},t.prototype.getTagGlobalUsageInfos=function(t){return this._serviceClient.getTagGlobalUsageInfos(t)},t.prototype.setDataTags=function(t,e){return this._serviceClient.setDataTags(t,e)},t})();