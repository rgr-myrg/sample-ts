import {SampleClass} from "../ts/SampleClass";

describe("SampleClass Spec", () => {
    let testIdString:String = "idString"
    let sampleClass:SampleClass = new SampleClass(testIdString);

    it("Should return a String", () => {
        expect(sampleClass.getId()).toEqual(testIdString);
    });
});
