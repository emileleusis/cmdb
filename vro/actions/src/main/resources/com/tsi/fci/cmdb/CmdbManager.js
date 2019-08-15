/**
 * Write a brief description of the purpose of the action.
 */
(function () {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();
    var CmdbEntry = Class.load("com.tsi.fci.cmdb","CmdbEntry");
    var CmdbMapper = Class.load("com.tsi.fci.cmdb","CmdbMapper");
    return Class.define(function CmdbManager(type,name,size,id){
        CmdbEntry.call(this,type,name,size,id);
        this.add = function(CmdbEntry){
            //call rest function
            var RestCall = new CmdbMapper(this.type);
            return("ADD:" + this.type + "-" + this.name + "-" + this.size + "-" + this.id + "-" + RestCall.add.url);
        }
        this.remove = function(CmdbEntry){
            //remove rest function
            return("REMOVE:" + this.type + "-" + this.name + "-" + this.size + "-" + this.id  + "-" + RestCall.remove.url );
        }
    },null, CmdbEntry);
})