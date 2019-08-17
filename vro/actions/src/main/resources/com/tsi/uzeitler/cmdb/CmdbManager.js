/**
 * Write a brief description of the purpose of the action.
 */
(function () {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();
    var CmdbEntry = Class.load("com.tsi.uzeitler.cmdb","CmdbEntry");
    var CmdbMapper = Class.load("com.tsi.uzeitler.cmdb","CmdbMapper");
    var RestClient = Class.load("com.vmware.pscoe.library.rest","RestClient");
    return Class.define(function CmdbManager(type,name,size,id){
        CmdbEntry.call(this,type,name,size,id);
        var RestCallDef = new CmdbMapper(this.type);
        var restHost = RESTHostManager.getHost(this.type);
        this.add = function(){
            //call rest function
            var RestCmdbClient = new RestClient(restHost);
            var params = function(){
                var urlTemplate = RestCallDef.add.urlTemplate;
                var tempParams = [];
                for each(var a in urlTemplate.match(/{.+}/g)){
                    b = eval(a.replace("{","").replace("}",""));
                    tempParams.push(b);
                }
                return params;
            }();
            System.log(params);
            var content = function(){
                var con = RestCallDef.add.content;
                var pattern = /%name%/g;
                con = con.replace(pattern,name);
                var pattern = /%size%/g;
                con = con.replace(pattern,size);
                var pattern = /%id%/g;
                con = con.replace(pattern,id);
                return con;
            }();
            System.log(content);
            try{
                var restOperation = RestCmdbClient.runRestOp(RestCallDef.add.method,RestCallDef.add.urlTemplate,params,content,null);
            }catch(e){
                //
            }
            return("ADD:" + this.type + "-" + this.name + "-" + this.size + "-" + this.id + "-" + RestCallDef.add.urlTemplate);

        }
        this.remove = function(CmdbEntry){
            //remove rest function
            var params = function(){
                var urlTemplate = RestCallDef.remove.urlTemplate;
                var tempParams = [];
                for each(var a in urlTemplate.match(/{.+}/g)){
                    b = eval(a.replace("{","").replace("}",""));
                    tempParams.push(b);
                }
                return tempParams;
            }();
            System.log(params);
            var content = function(){
                var con = RestCallDef.remove.content;
                var pattern = /%name%/g;
                con = con.replace(pattern,name);
                var pattern = /%size%/g;
                con = con.replace(pattern,size);
                var pattern = /%id%/g;
                con = con.replace(pattern,id);
                return con;
            }();
            System.log(content);
            return("REMOVE:" + this.type + "-" + this.name + "-" + this.size + "-" + this.id  + "-" + RestCallDef.remove.urlTemplate);
        }
    },null, CmdbEntry);
})