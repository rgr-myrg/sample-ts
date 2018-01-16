import {Events} from "../../ts/event/Events";
import {MuxBuilder} from "../../ts/mux/MuxBuilder";
import * as Mux from "mux-embed";

export class MuxSubscriber {
	private builder: MuxBuilder;
	private selectorId: string;
	private hasPlayStart: boolean = false;

	public constructor() {
		Events.when.onPlayerLoaded
			.do((id: string) => {
				this.onPlayerLoaded(id);
			});

		Events.when.onVideoData
			.do((data: Mux.VideoData) => {
				this.onVideoData(data);
			});

		Events.when.onPlayStart
			.do((data: Mux.VideoData) => {
				this.onPlayStart(data);
			});
	}

	private onPlayerLoaded(id: string): void {
		console.log("[MuxSubscriber] id: ", id);
		this.selectorId = id;
	}

	private onVideoData(data: Mux.VideoData): void {
		console.log("[MuxSubscriber] data: ", data);

		this.builder = new MuxBuilder()
			.withSelectorId(this.selectorId)
			.setData(data)
			.debugOn()
			.build();
	}

	private onPlayStart(data: Mux.VideoData): void {
		if (this.hasPlayStart) {
			this.builder
				.setData(data)
				.emitVideoChange();
		}

		this.hasPlayStart = true;
	}
}
