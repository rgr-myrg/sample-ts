import * as Mux from "mux-embed";

export class MuxBuilder {
	private muxLib: any = require("mux-embed");
	private isDebug: boolean = false;
	private selectorId: string = null;
	private videoData: Mux.VideoData = null;

	public withSelectorId(id: string): MuxBuilder {
		this.selectorId = id;
		return this;
	}

	public setData(data: Mux.VideoData): MuxBuilder {
		this.videoData = data;
		return this;
	}

	public debugOn(): MuxBuilder {
		this.isDebug = true;
		return this;
	}

	public build(): MuxBuilder {
		this.muxLib.monitor(this.selectorId, {
			"debug": this.isDebug,
			"data": this.videoData
		});
		return this;
	}
}
