import { IMPLEMENTED_CHAPTERS } from '../../shared/campaign.ts';
import { jsonFile } from '../../shared/runtime.ts';
import { requireValue } from '../../shared/http.ts';
import type { Campaign, ChapterView } from '../../shared/types.ts';
import { activeChapter, entry } from './repository.ts';
const parts=['one','two','three','four'].map(act=>jsonFile<{wrong:string[][];support:string[][]}>(`content/es/classroom/act-${act}-support.json`));
const wrong=parts.flatMap(p=>p.wrong),support=parts.flatMap(p=>p.support);
export function authorChapter(n:number) {return jsonFile(`content/es/chapters/chapter-${String(n).padStart(2,'0')}.json`);}
export function teacherChapter(n:number) {return jsonFile(`content/es/instructor/chapter-${String(n).padStart(2,'0')}.json`);}
export function chapterView(c:Campaign,n:number):ChapterView {
  requireValue(Number.isInteger(n)&&n>=1&&n<=IMPLEMENTED_CHAPTERS,'Este capítulo está diseñado, pero todavía no tiene escenario funcional.',404);
  requireValue(n<=activeChapter(c),'Este expediente sigue bloqueado. Completa primero los anteriores.',403);
  const source=authorChapter(n),teacher=teacherChapter(n),e=entry(c,n);
  const correctIndex=(n+1)%3;
  const options=[...wrong[n-1]];options.splice(correctIndex,0,teacher.understandingAnswer);
  return {number:n,id:source.id,act:source.act,actTitle:jsonFile<any[]>('content/es/campaign/acts.json')[source.act-1].title,title:source.title,sender:source.sender,narrativeEntry:source.narrativeEntry,learningObjective:source.learningObjective,predictionQuestion:source.predictionQuestion,guidedSteps:source.guidedSteps,support:support[n-1],question:source.understandingCheck.question,choices:options.map((v,i)=>({id:['a','b','c'][i],text:v})),entry:e,state:e.completed?'completed':e.understood?'understood':e.technical?'demonstrated':e.runId?'in-progress':'available',...(e.completed?{debrief:teacher.understandingAnswer+' '+source.debrief,artifact:source.nextNarrativeArtifact.label}:{})};
}
export function correctAnswer(n:number,answer:unknown){return answer===['a','b','c'][(n+1)%3];}
