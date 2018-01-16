import {EventSignal} from "../../ts/event/EventSignal";
describe("EventSignal Spec", () => {
	let signal:EventSignal;
	let subscriber: TestSubscriber;
	let handlerSpy: any;

	class TestSubscriber {
		private data: any;
		public handler(data: any): void {
			this.data = data;
		}
		public priority(data: any): void {}
		public getData(): any {
			return this.data;
		}
	}

	beforeEach(() => {
		signal = new EventSignal();
		subscriber = new TestSubscriber();
		handlerSpy = spyOn(subscriber, "handler").and.callThrough();
		spyOn(subscriber, "priority").and.callThrough();
	});

	it("post() should dispatch the test string", () => {
		let test: string = "a string";

		signal.do((data: string) => subscriber.handler(data));
		signal.post(test);

		expect(subscriber.handler).toHaveBeenCalledWith(test);
		expect(subscriber.getData()).toEqual(test);
	});

	it("post() should dispatch the test object", () => {
		let test = {name: "data point"};

		signal.do((data: object) => subscriber.handler(data));
		signal.post(test);

		expect(subscriber.handler).toHaveBeenCalledWith(test);
		expect(subscriber.getData().name).toEqual(test.name);
	});

	it("do() should prevent listener from registering multiple times", () => {
		let func: Function = (data: number) => subscriber.handler(data);

		// try to register multiple times
		for (let x: number = 0; x < 5; x++) {
			signal.do(func);
		}

		signal.post(1);

		expect(subscriber.handler).toHaveBeenCalledWith(1);
		expect(subscriber.handler).toHaveBeenCalledTimes(1);
		expect(subscriber.getData()).toEqual(1);
	});

	it("post() should notify the listener only once", () => {
		signal.doOnce((count: number) => subscriber.handler(count));
		signal.post(1);

		expect(subscriber.handler).toHaveBeenCalledWith(1);
		expect(subscriber.getData()).toEqual(1);

		signal.post(2);

		// getData should have the value from the first post()
		expect(subscriber.getData()).toEqual(1);
		expect(subscriber.handler).toHaveBeenCalledTimes(1);
	});

	it("prioritize() should execute the priority listener ahead of the queue", () => {
		signal.do((data: number) => subscriber.handler(data));
		signal.prioritize((data: number) => subscriber.priority(data));
		signal.post(1);
		expect(subscriber.priority).toHaveBeenCalledBefore(handlerSpy);
	});

	it("remove() should delete the listener from the queue", () => {
		let func: Function = (data: number) => subscriber.handler(data)
		signal.do(func);
		signal.post(1);
		signal.remove(func);
		signal.post(2);

		expect(subscriber.handler).toHaveBeenCalledTimes(1);
	});
});
