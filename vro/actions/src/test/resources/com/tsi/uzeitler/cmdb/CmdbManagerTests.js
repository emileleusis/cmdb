describe("jasmine.objectContaining", function() {
    var CmdbManager = System.getModule("com.tsi.uzeitler.cmdb").CmdbManager();
    var RestClient = System.getModule("com.tsi.uzeitler.cmdb","RestClient");
    var entry = new CmdbManager("Kangaroo","testCmdbEntry",13,1);
    it("should create a cmdbEntry object", function() {
        expect(entry).toEqual(jasmine.objectContaining({
            type: "Kangaroo",
            name: "testCmdbEntry",
            size: 13,
            id: 1
         }));
         expect(entry).not.toEqual(jasmine.objectContaining({
            type: "test"
         }));
         expect(entry.add()).not.toEqual(jasmine.objectContaining({
            type: "test"
         }));                  
   });
});