describe("jasmine.objectContaining", function() {
    var cmdbEntry = System.getModule("com.tsi.fci.cmdb").CmdbEntry();
    var entry = new cmdbEntry("Kangaroo","testCmdbEntry",13,1);
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
   });
});