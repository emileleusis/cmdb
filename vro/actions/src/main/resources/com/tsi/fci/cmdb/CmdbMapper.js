/**
 * Write a brief description of the purpose of the action.
 */
(function () {
    var Class = System.getModule("com.vmware.pscoe.library.class").Class();
    //var CmdbEntry = Class.load("com.tsi.fci.cmdb","CmdbEntry");
    return Class.define(function CmdbMapper(type){
        switch(type) {
            case "Kangaroo":
                this.add = {url:"api/record",
                            restOperation:"PUT",
                            body:'{"name" : "%name%", "size" : "%size%"}',
                            ok:"200"};
                this.remove = {url:"api/record/%id%",
                            restOperation:"DELETE",
                            body:'',
                            ok:"200"};
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