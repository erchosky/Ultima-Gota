import { useState } from 'react';
import { api } from './api';
export function LabAccess({chapterNumber}:{chapterNumber:number}){
  const [accounts,setAccounts]=useState<{name:string;password:string}[]>([]),[visible,setVisible]=useState(false),[error,setError]=useState('');
  return <section className="lab-access"><h3>{chapterNumber===10?'Cuentas autorizadas de Vera':'Objeto recuperable · cuenta de pruebas'}</h3><p>Solo datos ficticios. Recuperar este objeto no cambia logros ni consume pistas.</p>
    {!accounts.length?<button className="secondary" onClick={async()=>{try{const result=await api(`/api/chapters/${chapterNumber}/accounts`,{});setAccounts(result.accounts);setError('');}catch(e){setError((e as Error).message);}}}>Recuperar credenciales ficticias</button>:<>{accounts.map(a=><div key={a.name}><strong>{a.name}</strong><label>Contraseña ficticia de {a.name}<input readOnly type={visible?'text':'password'} value={a.password} autoComplete="off"/></label></div>)}<button className="text-button" aria-pressed={visible} onClick={()=>setVisible(v=>!v)}>{visible?'Ocultar valores':'Mostrar valores de laboratorio'}</button></>}
    {error&&<p role="alert">{error}</p>}
  </section>;
}
