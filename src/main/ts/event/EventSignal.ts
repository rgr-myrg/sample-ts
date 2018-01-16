export class EventSignal {
	private listeners: Function[] = [];
	private priority: Function[] = [];
	private once: Function[] = [];

	public do(listener: Function): EventSignal {
		if (!this.has(listener, this.listeners)) {
			this.listeners.push(listener);
		}

		return this;
	}

	public doOnce(listener: Function): EventSignal {
		if (!this.has(listener, this.once)) {
			this.once.push(listener);
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
		if (this.priority.length > 0) {
			this.dispatch(this.priority, arguments);
		}

		if (this.once.length > 0) {
			this.dispatch(this.once, arguments);
			this.once = [];
		}

		if (this.listeners.length > 0) {
			this.dispatch(this.listeners, arguments);
		}

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
}
