import { useEffect,useRef,useState } from 'react';
export function PracticeFrame({context,mode,value,reviewId,revision=0}:{context:any;mode:'description'|'message'|'review';value?:string;reviewId?:string;revision?:number}){
 const ref=useRef<HTMLIFrameElement>(null),[effect,setEffect]=useState('Preparando la representación…');
 const params=new URLSearchParams({copy:context.copyId,mode,revision:String(revision)});if(value!==undefined)params.set('mensaje',value);if(reviewId)params.set('reviewId',reviewId);
 const src='/practice/frame?'+params;
 useEffect(()=>{setEffect('Preparando la representación…');const receive=(e:MessageEvent)=>{if(e.source!==ref.current?.contentWindow||e.data?.kind!=='ug-frame'||e.data.copy!==context.copyId||e.data.mode!==mode)return;setEffect(e.data.mark&&e.data.mark===context.demoNonce?'Marca local ejecutada desde el contenido.':'Sin marca de ejecución.');};window.addEventListener('message',receive);return()=>window.removeEventListener('message',receive);},[src,context.copyId,context.demoNonce,mode]);
 return <section className="panel frame-panel"><h2>Representación en la página</h2><p className="muted">Marco aislado de práctica. Observa el contenido; el escritorio comprobará la reproducción por separado.</p><iframe key={src} ref={ref} title="Representación aislada del contenido" sandbox="allow-scripts" referrerPolicy="no-referrer" src={src} onLoad={()=>ref.current?.contentWindow?.postMessage('ug-observe','*')}/><p role="status" data-frame-report>{effect}</p></section>;
}
