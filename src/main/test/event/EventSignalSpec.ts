import {EventSignal} from "../../ts/event/EventSignal";
describe("EventSignal Spec", ( )=> {
	let signal:EventSignal;
	let message:string;
	let subscriber = {
		handler: function(data: string) {
			message = data;
		}
	};

	beforeEach(() => {
		signal = new EventSignal();
		spyOn(subscriber, 'handler').and.callThrough();
	});

	it("post() should notify the data point", () => {
		signal.do(subscriber.handler);
		signal.post("data string");
		expect(subscriber.handler).toHaveBeenCalledWith("data string");
	});

	// it("", () => {
	// 	let msg:string;
	// 	signal.bind((data: string) => {
	// 		msg = data;
	// 	});
    //
	// 	signal.post("test");
    //
	// 	expect(msg).toEqual("test");
	// });
});
