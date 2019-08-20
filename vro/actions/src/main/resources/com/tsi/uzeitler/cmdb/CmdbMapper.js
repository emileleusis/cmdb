/**
 * Write a brief description of the purpose of the action.
 */
(function () {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();
    return Class.define(function CmdbMapper(type){
        switch(type) {
            case "Kangaroo":
                this.add = [{
                  urlTemplate:"api/record",
                  //params:"",
                  method:"PUT",
                  content:'{"name" : "%name%", "size" : "%size%"}',
                  success:["200","200"],
                  failure: ["400","400"]
                }];
                this.remove = [{
                  urlTemplate:"api/record/{id}",
                  //params:["%id%"],
                  method:"DELETE",
                  content:"",
                  success:["200","200"],
                  failure: ["400","400"]
                }];
            // code block
            break;
            case "Wombat":
              this.add = [{
                urlTemplate:"cmdb/v1/record",
                //params:"",
                method:"POST",
                content:'<CreateRecord><Name>%name%</Name><Size>%size%</Size></CreateRecord>',
                success:["200","299"],
                failure: ["400","499"]
              }];
              this.remove = [{
                urlTemplate:"api/record/{id}",
                //params:["%id%"],
                method:"POST",
                content:'<DeleteRecord><Id>%id%</Id></DeleteRecord>',
                success:["200","299"],
                failure: ["400","499"]
              }];
              break;
            case "Platypus":
              this.add = [{
                urlTemplate:"api/transaction/create",
                //params:"",
                method:"POST",
                content:'{"name" : "%name%", "size" : "%size%"}',
                response:'{"transactionId"}',
                success:["200","200"],
                failure: ["400","400"]
              },
              {
                urlTemplate:"api/transaction/commit",
                //params:"",
                method:"POST",
                content:'{"transactionId" : %transactionId%}',
                success:["200","200"],
                failure: ["400","400"]
              }];
              this.remove = [{
                urlTemplate:"api/transaction/delete",
                //params:["%id%"],
                method:"POST",
                content:'{"id":"%id%"}',
                response:'{"transactionId"}',
                success:["200","200"],
                failure: ["400","400"]
              },{
                urlTemplate:"api/transaction/commit",
                //params:["%id%"],
                method:"POST",
                content:'{"transactionId" : "%transactionId%"}',
                response:'',
                success:["200","200"],
                failure: ["400","400"]
              }];
              break;
            default:
              // code block
          }
    });
})