import {MuxBuilder} from "../../ts/mux/MuxBuilder";
import * as Mux from "mux-embed";

describe("MuxBuilder Spec", () => {
	let builder: MuxBuilder = null;
	let data: Mux.VideoData = {
		property_key: "e943cd86834c363d0d06a3826",
		page_type: '', // (see docs) 'watchpage', 'iframe', or leave empty
		viewer_user_id: "", // ex: '12345'
		experiment_name: '', // ex: 'player_test_A'
		sub_property_id: '', // ex: 'cus-1'

		// Player Metadata
		player_name: 'CBSi Player',
		player_version: '1.0.0',
		player_init_time: 1451606400000,

		// Video Metadata (cleared with 'videochange' event)
		video_id: '', // ex: 'abcd123'
		video_title: '', // ex: 'My Great Video'
		video_series: '', // ex: 'Weekly Great Videos'
		video_producer: '', // ex: 'Bob the Producer'
		video_content_type: '', // 'short', 'movie', 'episode', 'clip', 'trailer', or 'event'
		video_language_code: '', // ex: 'en'
		video_variant_name: '', // ex: 'Spanish Hard Subs'
		video_variant_id: '', // ex: 'abcd1234'
		video_duration: 120000, // in milliseconds, ex: 120000
		video_stream_type: '', // 'live' or 'on-demand'
		video_encoding_variant: '', // ex: 'Variant 1'
		video_cdn: 'Akamai' // ex: 'Fastly', 'Akamai'
	};

	/*
	 * Mux library monitor() method needs to attach itself to the video player.
	 * Mock the video source for this purpose.
	 */
	let source = window.document.createElement("source");
	source.setAttribute("src", "http://techslides.com/demos/sample-videos/small.mp4");
	source.setAttribute("type", "video/mp4");

	let video = window.document.createElement("video");
	video.id = "video";
	video.appendChild(source);

	window.document.body.appendChild(video);

	beforeEach(() => {
		builder  = new MuxBuilder();
	});

	it("withSelectorId() should return a MuxBuilder instance.", () => {
		expect(typeof builder.withSelectorId("id")).toBe(typeof builder);
	});

	it("setData() should return a MuxBuilder instance.", () => {
		expect(typeof builder.setData(data)).toBe(typeof builder);
	});

	it("debugOn() should return a MuxBuilder instance.", () => {
		expect(typeof builder.debugOn()).toBe(typeof builder);
	});

	it("debug() should return a MuxBuilder instance.", () => {
		expect(typeof builder
			.withSelectorId("#video")
			.setData(data)
			.build()
		).toBe(typeof builder);
	});
});
