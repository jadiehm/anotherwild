import { writable } from "svelte/store";

export const freqDataStore = writable([]);
export const currTrack = writable();
export const currAboutSection = writable("aboutthisproject");
export const aboutVisible = writable(false);
export const folderVisible = writable(false);
export const radioVisible = writable(false);
export const notesVisible = writable(false);
export const viewfinderVisible = writable(false);
export const logsVisible = writable(false);
export const typewriterVisible = writable(false);
export const bckBtnVisible = writable(false);