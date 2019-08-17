/**
 * Write a brief description of the purpose of the action.
 */
(function () {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();
    //var CmdbEntry = Class.load("com.tsi.uzeitler.cmdb","CmdbEntry");
    return Class.define(function CmdbMapper(type){
        switch(type) {
            case "Kangaroo":
                this.add = {
                  urlTemplate:"api/record",
                  //params:"",
                  method:"PUT",
                  content:'{"name" : "%name%", "size" : "%size%"}',
                  success:"200",
                  failure: "400"
                };
                this.remove = {
                  urlTemplate:"api/record/{id}",
                  //params:["%id%"],
                  method:"DELETE",
                  content:"",
                  success:"200",
                  failure: "400"
                };
                /*                this.add = '[' + 
                ' {	' + 
                '	"urlTemplate":"api/record",' + 
                '	"params":"",' + 
                '	"method":"PUT",' + 
                '	"content":"{\\"name\\":\\"%name%\\",\\"size\\":\\"%size%\\"}",' + 
                ' "success":"200",' + 
                '	"failure":"400"' + 
                ' }' + 
                ']';
                this.remove = '[' + 
                ' {	' + 
                '	"urlTemplate":"api/record/{id}",' + 
                '	"params":["%id%"],' + 
                '	"method":"DELETE",' + 
                ' "success":"200",' + 
                '	"failure":"400"' + 
                ' }' + 
                ']';*/
              // code block
            break;
            case "Wombat":
              // code block
              break;
            case "Platypus":
                // code block
              break;
            default:
              // code block
          }
    });
})