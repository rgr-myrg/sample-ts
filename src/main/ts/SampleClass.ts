export class SampleClass {
    id:String = "";

    constructor(private _id:String) {
        this.id = _id;
    }

    public getId():String {
        return this.id;
    }
}
