export class EventSignal {
	private listeners: Function[] = [];
	private priority: Function[] = [];

	public do(listener: Function): EventSignal {
		if (!this.has(listener, this.listeners)) {
			this.listeners.push(listener);
		}
		return this;
	}

	public prioritize(listener: Function): EventSignal {
		if (!this.has(listener, this.priority)) {
			this.priority.push(listener);
		}
		return this;
	}

	public remove(listener: Function): EventSignal {
		this.priority = this.filter(listener, this.priority);
		this.listeners = this.filter(listener, this.listeners);
		return this;
	}

	public post(data:any): EventSignal;
	public post(): EventSignal;
	public post(): EventSignal {
		// for (let i = 0, size = this.listeners.length; i < size; i++) {
		// 	let listener: Function = this.listeners[i];
		// 	listener.apply(this, arguments);
		// }
		this.dispatch(this.priority, arguments);
		this.dispatch(this.listeners, arguments);
		return this;
	}

	private dispatch(queued: Function[], ...args: any[]): void {
		for (let i = 0, size = queued.length; i < size; i++) {
			let listener: Function = queued[i];
			listener.apply(this, args[0]);
		}
	}

	private filter(listener: Function, collection: Function[]): Function[] {
		return collection.filter((item) => {
			item !== listener;
		});
	}

	private has(listener: Function, collection: Function[]): boolean {
		return this.listeners.some((item) => {
			return item === listener;
		});
	}

	// public elsePost(data:any): EventSignal;
	// public elsePost(): EventSignal {
	// 	for (let i = 0, size = this.callbacks.length; i < size; i++) {
	// 		let callback: Function = this.callbacks[i];
	// 		callback.apply(this, arguments);
	// 	}
	// 	return this;
	// }

/*
	public post(data:any): void;
	public post(parent: object, data:any): void;

	public post(): void {
		let parent: object = null;
		let data: any = arguments[0];

		if (arguments.length > 0 && typeof arguments[0] === "object") {
			parent = arguments[0];
			data = arguments[1];
		}

		for (let i = 0, size = this.listeners.length; i < size; i++) {
			let _listener: Function = this.listeners[i];
			(function(data: any) {
				_listener.apply(parent, arguments);
			})(data);
		}
	}
*/
}
