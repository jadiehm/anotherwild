import { writable } from "svelte/store";

export const freqDataStore = writable([]);
export const currTrack = writable();
export const currAboutSection = writable("aboutthisproject");
export const aboutVisible = writable(false);
export const folderVisible = writable(false);