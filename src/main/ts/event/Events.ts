import {EventSignal} from "../../ts/event/EventSignal";

export namespace Events {
	export namespace when {
		export const onPlayerLoaded: EventSignal = new EventSignal();
		export const onVideoData: EventSignal = new EventSignal();
		export const onPlayStart: EventSignal = new EventSignal();
		export const onPause: EventSignal = new EventSignal();
		export const onPlayResume: EventSignal = new EventSignal();
		export const onSeekStart: EventSignal = new EventSignal();
		export const onSeekEnd: EventSignal = new EventSignal();
		export const onPlayEnd: EventSignal = new EventSignal();
		export const onPlaylistStart: EventSignal = new EventSignal();
		export const onPlaylistEnd: EventSignal = new EventSignal();
	}
}
