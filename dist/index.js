import { AssToMs, convertSRTTags, msToAss } from './utils.js';
import stringify from 'ass-stringify';
import * as ass from './assTemplate.js';
const generateDialogue = (line, styles) => {
    let startMs = +line.startTime - 1000;
    if (startMs < 0)
        startMs = 0;
    const stopMs = +line.endTime;
    const dialogue = ass.getDialogue();
    dialogue.value.Start = msToAss(startMs);
    dialogue.value.End = msToAss(stopMs);
    dialogue.value.Text = line.text;
    dialogue.value.Effect = '';
    dialogue.value.Style = styles.body[1].value.Name;
    return dialogue;
};
const sortStartTime = (a, b) => {
    if (a.value.Start < b.value.Start)
        return -1;
    if (a.value.Start > b.value.Start)
        return 1;
    return 0;
};
export const parseSRT = (srt) => {
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
        if (+line > 0 && !insideSubSegment) {
            insideSubSegment = true;
            continue;
        }
        if (line.match(/\d+:\d\d:\d\d,\d\d\d --> \d+:\d\d:\d\d,\d\d\d/)) {
            const startTime = line.split(' --> ')[0].replaceAll(',', '.');
            const endTime = line.split(' --> ')[1].replaceAll(',', '.');
            subSegment.startTime = AssToMs(startTime);
            subSegment.endTime = AssToMs(endTime);
            continue;
        }
        if (line === '') {
            subSegment.text = sub.join('\\n');
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
        sub.push(convertSRTTags(line));
    }
    if (insideSubSegment) {
        subSegment.text = sub.join('\\n');
        ass.push(subSegment);
    }
    return ass;
};
export const srtToAss = (text) => {
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
};
//# sourceMappingURL=index.js.map