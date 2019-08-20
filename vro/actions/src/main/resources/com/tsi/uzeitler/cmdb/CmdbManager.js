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

        this.add = function(){
            //call rest function
            //var counter = 0;
            var responseContent = "";
            for each (var addCommand in RestCallDef.add){
                executeRest(addCommand);
                /*System.log(counter++);
                var params = paramsReplace(addCommand.urlTemplate);
                System.log(params);
                if(responseContent == "")var content = contentReplace(addCommand.content);            
                System.log(content);
                try{
                    System.log("RestHostNameType:" + this.type);
                    for each(var a in RESTHostManager.getHosts()){
                        if(RESTHostManager.getHost(a).name = this.type ){
                            var restHost = RESTHostManager.getHost(a);
                            break;
                        }
                    }
                    System.log("RestHostName:" + restHost.name + "-" + restHost.id);
                    var RestCmdbClient = new RestClient(restHost);
                    if(addCommand.method == "PUT"){
                        var restOperation = RestCmdbClient.put(addCommand.urlTemplate,params,content,null);
                    }
                    if(restOperation.statusCode >= addCommand.success[0] && restOperation.statusCode <= addCommand.success[1]){
                        System.log("RestOperation success !");
                    }else if(restOperation.statusCode >= addCommand.failure[0] && restOperation.statusCode <= addCommand.failure[1]){
                        throw("Request failure. Status code :" + restOperation.statusCode);
                    }else{
                        throw("Undefined status code. Please check if successful: " + restOperation.statusCode);
                    }
                    var responseContent = restOperation.contentAsString;
                }catch(e){
                    System.error("Problems to execute Rest Request: " + e);
                }
                System.log("ADD:" + this.type + "-" + this.name + "-" + this.size + "-" + this.id + "-" + addCommand.urlTemplate);
            }*/
            }
        };
        this.remove = function(){
            //remove rest function
            for each (var removeCommand in RestCallDef.remove){
                executeRest(removeCommand);
                /*var params = paramsReplace(removeCommand.urlTemplate);
                System.log(params);
                
                var content = contentReplace(removeCommand.content);            
                System.log(content);
                try{
                    var restHost = RESTHostManager.getHost(this.type);
                    var RestCmdbClient = new RestClient(restHost);
                    
                    var restOperation = eval(RestCmdbClient.runRestOp(removeCommand.method,removeCommand.urlTemplate,params,content,null));
                }catch(e){
                    System.error("Problems to execute Rest Request: " + e);
                }
                System.log("REMOVE:" + this.type + "-" + this.name + "-" + this.size + "-" + this.id  + "-" + removeCommand.urlTemplate);*/
            }
                
        };
        function paramsReplace(urlTemplate){
            var tempParams = [];
            for each(var a in urlTemplate.match(/{.+}/g)){
                b = eval(a.replace("{","").replace("}",""));
                tempParams.push(b);
            }
            return tempParams;
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
            System.log(params);
            if(responseContent == undefined)var content = contentReplace(commandDef.content);            
            System.log(content);
            try{
                System.log("RestHostNameType:" + type);
                for each(var a in RESTHostManager.getHosts()){
                    if(RESTHostManager.getHost(a).name = type ){
                        var restHost = RESTHostManager.getHost(a);
                        break;
                    }
                }
                System.log("RestHostName:" + restHost.name + "-" + restHost.id);
                var RestCmdbClient = new RestClient(restHost);
                switch(commandDef.method) {
                    case "PUT":
                        var restOperation = RestCmdbClient.put(commandDef.urlTemplate,params,content,null);
                        break;
                    case "POST":
                        var restOperation = RestCmdbClient.push(commandDef.urlTemplate,params,content,null);
                        break;
                    case "DELETE":
                        var restOperation = RestCmdbClient.delete(commandDef.urlTemplate,params,content,null);
                        break;                                                        
                    default:
                        //
                }
                if(restOperation.statusCode >= commandDef.success[0] && restOperation.statusCode <= commandDef.success[1]){
                    System.log("RestOperation success !");
                }else if(restOperation.statusCode >= commandDef.failure[0] && restOperation.statusCode <= commandDef.failure[1]){
                    throw("Request failure. Status code :" + restOperation.statusCode);
                }else{
                    throw("Undefined status code. Please check if successful: " + restOperation.statusCode);
                }
                var responseContent = restOperation.contentAsString;
            }catch(e){
                System.error("Problems to execute Rest Request: " + e);
            }
            System.log(":" + type + "-" + name + "-" + size + "-" + id + "-" + commandDef.urlTemplate);
        }     
    },null, CmdbEntry);
})