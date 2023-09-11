import { AssToMs, convertSRTTags, msToAss } from './utils.js';
import stringify from 'ass-stringify';
import * as ass from './assTemplate.js';

const generateDialogue = (line: any, styles: any) => {
	let startMs = +line.startTime;
	if (startMs < 0) startMs = 0;
	const stopMs = +line.endTime;
	const dialogue = ass.getDialogue();
	dialogue.value.Start  = msToAss(startMs);
	dialogue.value.End = msToAss(stopMs);
	dialogue.value.Text = line.text;
	dialogue.value.Effect = '';
	dialogue.value.Style = styles.body[1].value.Name;
	return dialogue;
}

const sortStartTime = (a: any, b: any) => {
	if (a.value.Start < b.value.Start) return -1;
	if (a.value.Start > b.value.Start) return 1;
	return 0;
}

/** Parse SRT into something actually usable. Also replaces SRT tags by ASS tags */
export const parseSRT = (srt: string) => {
	// Windows' CRLFs are a pain, please kill them.
	const rawArr = srt.replaceAll('\r', '').split('\n');
	const ass = [];
	let subSegment = {
		startTime: 0,
		endTime: 0,
		text: ''
	};
	let insideSubSegment = false;
	let sub = [];
	for (const line of rawArr) {
		// First line should always be a number.
		if (+line > 0 && !insideSubSegment) {
			insideSubSegment = true;
			continue;
		}
		if (line.match(/\d+:\d\d:\d\d,\d\d\d --> \d+:\d\d:\d\d,\d\d\d/)) {
			const startTime = line.split(' --> ')[0].replaceAll(',','.');
			const endTime = line.split(' --> ')[1].replaceAll(',','.');
			// Let's convert those to miliseconds because we'll need to add the 1s delay so lines appear a little earlier than expected.
			subSegment.startTime = AssToMs(startTime);
			subSegment.endTime = AssToMs(endTime);
			continue;
		}
		if (line === '') {
			// Sub segment is done
			subSegment.text = sub.join('\\N');
			ass.push(subSegment);
			subSegment = {
				startTime: 0,
				endTime: 0,
				text: ''
			};
			insideSubSegment = false;
			sub = [];
			continue;
		}
		// Last possibility is that this contains text. So we're adding it.
		sub.push(convertSRTTags(line));
	}
	if (insideSubSegment) {
		subSegment.text = sub.join('\\N');
		ass.push(subSegment);
	}
	return ass;
}

/** Convert SRT data (text) to ASS */
export const srtToAss = (text: string) => {
	const sub = parseSRT(text);
	const dialogues = [];
	const styles = ass.getStyles();
	const script = ass.getDialogue();
	script.value.Effect = ass.scriptFX;
	script.value.Text = ass.script;
	script.key = 'Comment';
	for (const line of sub) {
		dialogues.push(generateDialogue(line, styles));
	}
	dialogues.sort(sortStartTime);
	const events = ass.getEvents();
	events.body = [...events.body, ...dialogues];
	return stringify([ass.getScriptInfo(), styles, events]);
}