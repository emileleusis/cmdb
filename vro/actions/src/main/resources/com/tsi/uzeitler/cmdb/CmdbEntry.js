/**
 * Write a brief description of the purpose of the action.
 */
(function () {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();
    return Class.define(function CmdbEntry(type,name,size,id){
        this.type = type;
        this.name = name;
        this.size = size;
        this.id = id;
        /*this.add = function(){
            //call rest function
            return("ADD:" + this.type + "-" + this.name + "-" + this.size + "-" + this.id );
        }
        this.remove = function(){
            //remove rest function
            return("REMOVE:" + this.type + "-" + this.name + "-" + this.size + "-" + this.id );
        }*/
    })
})