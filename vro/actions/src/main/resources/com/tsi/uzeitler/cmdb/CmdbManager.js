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
        this.RestCallDef = new CmdbMapper(this.type);
        var responseContent = "";

        function paramsReplace(urlTemplate){
            var tempParams = [];
            try{
                if(urlTemplate.match(/{.+}/g) != null ){
                    urlTemplate.match(/{.+}/g).forEach(function (a){
                        b = eval(a.replace("{","").replace("}",""));
                        tempParams.push(b);
                    });
                }
            }catch(e){
                System.log(e);
            }finally{
                return tempParams;
            }
        };
        function contentReplace(con){
            var pattern = /%name%/g;
            con = con.replace(pattern,name);
            var pattern = /%size%/g;
            con = con.replace(pattern,size);
            var pattern = /%id%/g;
            con = con.replace(pattern,id);
            return con;
        };
        function executeRest(commandDef){
            //System.log(counter++);
            var params = paramsReplace(commandDef.urlTemplate);
            
            System.log("urlTemplate-Values for Params: " + params);
            System.log("this.responseContent: " + responseContent);
            if(responseContent == ""){
                var content = contentReplace(commandDef.content);
            }else{
                var content = responseContent;
            }          
            System.log("RestBody after Replace: " + content);
            try{
                System.log("RestHostNameType:" + type);
                for each(var a in RESTHostManager.getHosts()){
                    if(RESTHostManager.getHost(a).name == type ){
                        var restHost = RESTHostManager.getHost(a);
                        break;
                    }
                }
                if(restHost == undefined || restHost == null )throw ("No Rest Host found. Cancelling.");
                System.log("RestHostName:" + restHost.name + "-" + restHost.id);
                var RestCmdbClient = new RestClient(restHost);
                switch(commandDef.method) {
                    case "PUT":
                        var restOperation = RestCmdbClient.put(commandDef.urlTemplate,params,content,null);
                        break;
                    case "POST":
                        var restOperation = RestCmdbClient.post(commandDef.urlTemplate,params,content,null);
                        break;
                    case "DELETE":
                        var restOperation = RestCmdbClient.delete(commandDef.urlTemplate,params,null);
                        break;                                                        
                    default:
                        //
                }
                
                if(restOperation.statusCode >= commandDef.success[0] && restOperation.statusCode <= commandDef.success[1]){
                    System.log("RestOperation success !");
                    responseContent = restOperation.contentAsString;
                }else if(restOperation.statusCode >= commandDef.failure[0] && restOperation.statusCode <= commandDef.failure[1]){
                    throw("Request failure. Status code :" + restOperation.statusCode);
                }else{
                    throw("Undefined status code. Please check if successful: " + restOperation.statusCode);
                }
                
            }catch(e){
                System.error("Problems to execute Rest Request: " + e);
            }finally{
                //responseContent = "24623453425234";
                //System.log(":" + type + "-" + name + "-" + size + "-" + id + "-" + commandDef.urlTemplate);
            }
        }

        this.executeRestI = function(commandDef){executeRest(commandDef)};
    },{
        add: function (){
            System.log("RestCallDef.add.length: " + this.RestCallDef.add.length);
            this.RestCallDef.add.forEach(this.executeRestI);
        },
        remove: function (){
            System.log("RestCallDef.remove.length: " + this.RestCallDef.remove.length);
            this.RestCallDef.remove.forEach(this.executeRestI);
        }						
    }, CmdbEntry);
})