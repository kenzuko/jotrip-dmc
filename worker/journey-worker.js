const RECIPIENT='phuquoclux@gmail.com';
const SENDER='journey@jotrip.vn';
const ALLOWED_ORIGINS=new Set(['https://jotrip.vn','https://www.jotrip.vn']);

const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'}});
const clamp=(v,max=1200)=>String(v??'').trim().slice(0,max);
const htmlEscape=v=>clamp(v,4000).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const normalizeLead=body=>({
  id:crypto.randomUUID(),
  createdAt:new Date().toISOString(),
  name:clamp(body.guestName,160),
  contact:clamp(body.contactNumber,160),
  email:clamp(body.guestEmail,320).toLowerCase(),
  preferred:clamp(body.preferred,40),
  when:clamp(body.when,320),
  with:clamp(body.with,320),
  stay:clamp(body.stay,320),
  experience:clamp(body.experience,800),
  avoid:clamp(body.avoid,800),
  yours:clamp(body.yours,1800),
  page:clamp(body.page,500),
  locale:clamp(body.locale,20),
  source:'jotrip.vn/journey-paper'
});

const isEmail=v=>!v||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export class LeadStore {
  constructor(ctx,env){this.ctx=ctx;this.env=env;}
  async fetch(request){
    if(request.method!=='POST') return json({ok:false,error:'method_not_allowed'},405);
    const lead=await request.json();
    await this.ctx.storage.put(`lead:${lead.createdAt}:${lead.id}`,lead);
    await this.ctx.storage.put('latest',lead);
    return json({ok:true,id:lead.id});
  }
}

const emailBody=lead=>{
  const rows=[
    ['Name',lead.name],['Contact',lead.contact],['Email',lead.email],['Preferred channel',lead.preferred],['Dates / timing',lead.when],['Travelling with',lead.with],['Stay',lead.stay],['More of',lead.experience],['Avoid',lead.avoid],['What makes it theirs',lead.yours],['Page',lead.page],['Lead ID',lead.id],['Received',lead.createdAt]
  ].filter(([,v])=>v);
  const text=['JOTRIP DMC - NEW JOURNEY REQUEST','',...rows.map(([k,v])=>`${k}: ${v}`)].join('\n');
  const html=`<div style="font-family:Arial,sans-serif;line-height:1.55;color:#1b1b18"><h2>JoTrip DMC - New Journey Request</h2><table style="border-collapse:collapse;width:100%;max-width:760px">${rows.map(([k,v])=>`<tr><td style="padding:8px 12px;border-bottom:1px solid #ddd;font-weight:700;vertical-align:top;width:180px">${htmlEscape(k)}</td><td style="padding:8px 12px;border-bottom:1px solid #ddd;white-space:pre-wrap">${htmlEscape(v)}</td></tr>`).join('')}</table></div>`;
  return {text,html};
};

async function handleJourney(request,env){
  if(request.method==='OPTIONS') return new Response(null,{status:204,headers:{'allow':'POST, OPTIONS'}});
  if(request.method!=='POST') return json({ok:false,error:'method_not_allowed'},405);
  const origin=request.headers.get('origin');
  if(origin&&!ALLOWED_ORIGINS.has(origin)) return json({ok:false,error:'origin_not_allowed'},403);
  const length=Number(request.headers.get('content-length')||0);
  if(length>20000) return json({ok:false,error:'payload_too_large'},413);

  let body;
  try{body=await request.json();}catch{return json({ok:false,error:'invalid_json'},400);}
  if(body.website) return json({ok:true});

  const lead=normalizeLead(body);
  if(!lead.name) return json({ok:false,error:'name_required'},400);
  if(!lead.contact&&!lead.email) return json({ok:false,error:'contact_required'},400);
  if(!isEmail(lead.email)) return json({ok:false,error:'invalid_email'},400);

  const store=env.LEADS.get(env.LEADS.idFromName('jotrip-dmc-leads'));
  await store.fetch('https://lead-store.internal/',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(lead)});

  const bodyEmail=emailBody(lead);
  try{
    const result=await env.EMAIL.send({to:RECIPIENT,from:SENDER,replyTo:lead.email||undefined,subject:`JoTrip DMC · Journey request · ${lead.name}`,text:bodyEmail.text,html:bodyEmail.html});
    return json({ok:true,id:lead.id,emailSent:true,messageId:result?.messageId||null});
  }catch(error){
    console.error('journey_email_failed',{leadId:lead.id,error:String(error?.message||error)});
    return json({ok:false,id:lead.id,saved:true,emailSent:false,error:'email_unavailable'},503);
  }
}

export default {
  async fetch(request,env){
    const url=new URL(request.url);
    if(url.pathname==='/api/health') return json({ok:true,service:'jotrip-dmc',journeyIntake:true});
    if(url.pathname==='/api/journey') return handleJourney(request,env);
    return env.ASSETS.fetch(request);
  }
};
