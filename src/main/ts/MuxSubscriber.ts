import {Events} from "../ts/Events";
import {MuxBuilder} from "../ts/MuxBuilder";
import * as Mux from "mux-embed";

export class MuxSubscriber {
	private builder: MuxBuilder;
	private selectorId: string;
	private hasPlayStart: boolean = false;

	public constructor() {
		Events.when.onPlayerLoaded.do((id: string) => {
				this.selectorId = id;
				console.log("[MuxSubscriber] id: ", this.selectorId);
			});

		Events.when.onVideoData
			.do((data: Mux.VideoData) => {
					this.onVideoData(data);
			})
			.else(() => {});

		Events.when.onPlayStart
			.do((data: Mux.VideoData) => {
				this.onPlayStart(data);
			});
	}

	private onPlayerLoaded(id: string): void {
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
