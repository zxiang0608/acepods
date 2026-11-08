'use strict';
const $=id=>document.getElementById(id);
const PW=595.2,PH=841.68,X=[18.72,41.64,140.28,316.44,403.56,446.64,472.68,511.08,569.4],NS='http://www.w3.org/2000/svg';
const clone=value=>JSON.parse(JSON.stringify(value));
const dateNow=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kuala_Lumpur',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const newId=()=>globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
const freshReference=()=>'ACE-'+dateNow().replaceAll('-','')+'-'+newId().replaceAll('-','').slice(-6).toUpperCase();
function num(value){const n=Number(value);return Number.isFinite(n)?Math.max(0,n):0;}
const cents=value=>Math.round(num(value)*100);
const formatted=value=>(value/100).toLocaleString('en-MY',{minimumFractionDigits:2,maximumFractionDigits:2});
const money=value=>'RM'+formatted(value);
function newItem(){return{id:newId(),kind:'item',description:'',dimensions:'',qty:1,price:0,free:false,height:0,columns:1,images:[],configuration:null,addons:[]};}
const defaults=()=>({reference:freshReference(),date:dateNow(),agent:'',validity:14,chargesConfirmed:false,chargesMode:'manual',customer:'',address:'',phone:'',attention:'',email:'',sameAddress:true,deliveryAddress:'',building:'',floor:'',handling:'',delivery:0,installation:0,handlingFee:0,discount:0,tax:0,notes:'',payment:'',deliveryTerms:'For normal furniture, we deliver within 7 to 21 working days upon confirmation with official purchase order and deposit. Subject to Delivery Location & Ad-Hoc Orders\nFor office pods/phone booths, 4-6 Weeks from official order payment date and full Confirmation of Specification',warranty:'Kindly refer to product description for project items warranty.\nFor office chairs: 1 year warranty on mechanical parts, wear and tear not included\nFor other furniture: 1 year warranty on manufacturer\'s defect, wear and tear not included\nFor office booths/office pods: 2 years on manufacturing defects on structure, 2 years warranty on electrical parts',transportTerms:'Transportation will charge RM120 for purchase below RM2,000 (only in Klang Valley area); additional charges will differ for other areas.\nFree of charge - handling to ground floor or by lift only (except construction site).\nFor more than 1 floor, separate customised charges will be imposed.',remarks:'Goods sold are not returnable or exchangeable and deposits paid are not refundable.\nCancellation of PO will incur a fee of 50% on total purchase price for restocking.',companyName:'ACE WORKPLACE SOLUTIONS',companyRef:'202403171118',companyAddress:'Jalan Seri Wangsa 2, Taman Sri Rampai, 53300 Kuala Lumpur',companyPhone:'+6011-54352700',companyEmail:'aceofficefurnituremy@gmail.com',websites:'www.aceofficepods.com / www.aceoffice.com.my',bank:'HONG LEONG BANK',bankName:'ACE WORKPLACE SOLUTIONS',bankAccount:'39500239853',signatory:'',items:[newItem()]});
const POD_PHOTOS=[{key:'s-pod',label:'S Pod',image:ASSETS.sPodPhoto},{key:'team-pod',label:'TEAM Pod',image:ASSETS.teamPodPhoto}];
let state=defaults(),dirty=false,layoutError='',pages=[],renderTimer;
const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');
function modelFor(item){return WEBSITE_PRICE_PRESETS.find(p=>p.key===item.pricePreset)||null;}
function isManagedPodPhoto(image){return POD_PHOTOS.some(p=>p.key===image.preset)||WEBSITE_PRICE_PRESETS.some(p=>'website:'+p.key===image.preset);}
function itemLabel(item){const name=modelFor(item)?.label||item.description.replaceAll('**','').split('\n')[0]||'New pod or item';return name+(item.configuration?' ('+item.configuration.label+' variant)':'');}
function podUnitPrice(item){return((item.free?0:cents(item.price))+cents(item.configuration?.price))/100;}
function quoteDescription(item){
  const lines=item.description.split('\n').filter(line=>line!=='Pod only. Delivery, installation and selected extras are itemised separately.');
  if(item.configuration){const title=lines[0]||modelFor(item)?.label||'Pod';const bold=title.startsWith('**')&&title.endsWith('**');lines[0]=(bold?'**':'')+(bold?title.slice(2,-2):title)+' ('+item.configuration.label+' variant)'+(bold?'**':'');}
  return lines.join('\n');
}
function addonImages(item,addon){const data=modelFor(item)?.addons.find(option=>option.id===addon.id)?.image;return data?[{name:addon.label,data}]:[];}
function addonDescription(item,addon){return addon.label+(modelFor(item)?.key==='ace-flex'&&addon.id==='flex-sofa'?'\nSofa shown inside Ace Flex; pod priced separately.':'');}
function applyWebsitePricePreset(item,key){
  const preset=WEBSITE_PRICE_PRESETS.find(p=>p.key===key);if(!preset)throw Error('Choose a pod model.');
  const extras=item.images.filter(image=>!isManagedPodPhoto(image));if(extras.length>=12)throw Error('Remove a photo before changing the model (maximum 12 photos).');
  item.description='**'+preset.label+'**';
  item.dimensions=preset.dimensions;item.price=preset.price;item.free=false;item.pricePreset=key;item.configuration=null;item.addons=[];
  item.images=[{name:preset.label,data:preset.image,preset:'website:'+key},...extras];
}
function useCustomItem(item){delete item.pricePreset;item.description='';item.dimensions='';item.price=0;item.free=false;item.configuration=null;item.addons=[];item.images=item.images.filter(image=>!isManagedPodPhoto(image));}
function setPodPhoto(item,key){
  const photo=POD_PHOTOS.find(p=>p.key===key);if(!photo)throw Error('Choose a legacy pod photo.');
  const extras=item.images.filter(image=>!isManagedPodPhoto(image));if(extras.length>=12)throw Error('Remove a photo before adding this one.');
  if(item.pricePreset){delete item.pricePreset;item.description='';item.dimensions='';item.price=0;item.configuration=null;item.addons=[];}
  if(!item.description.trim())item.description=photo.label;
  item.images=[{name:photo.label+' — original quotation',data:photo.image,preset:photo.key},...extras];
}
function selectConfiguration(item,id){
  if(!id){item.configuration=null;return;}
  const option=modelFor(item)?.configurations.find(o=>o.id===id);if(!option)throw Error('This setup is not available for the selected pod.');
  item.configuration={id:option.id,label:option.label,price:option.price,quoteRequired:option.quoteRequired,includesSofa:option.includesSofa};
  if(option.includesSofa)item.addons=item.addons.filter(addon=>addon.kind!=='sofa');
}
function toggleAddon(item,id,selected){
  item.addons=item.addons||[];if(!selected){item.addons=item.addons.filter(a=>a.id!==id);return;}
  const option=modelFor(item)?.addons.find(a=>a.id===id);if(!option)throw Error('This add-on is not available for the selected pod.');
  if(option.kind==='sofa'&&item.configuration?.includesSofa)throw Error('Sofas are already included in this setup.');
  if(item.addons.some(a=>a.id===id))return;
  if(option.exclusiveGroup){const model=modelFor(item);item.addons=item.addons.filter(a=>model.addons.find(o=>o.id===a.id)?.exclusiveGroup!==option.exclusiveGroup);}
  item.addons.push({id:option.id,label:option.label,price:option.price,qty:num(item.qty)||1,followQuantity:true,kind:option.kind,custom:false});
}
function updateItemQuantity(item,quantity){item.qty=num(quantity);for(const addon of item.addons||[])if(addon.followQuantity!==false)addon.qty=item.qty;}
function quoteRows(s=state){
  const rows=[];let n=0;
  for(const item of s.items){if(item.kind==='section'){rows.push({...item,indexLabel:''});continue;}
    const index=String(++n);rows.push({...item,indexLabel:index,description:quoteDescription(item),price:podUnitPrice(item),pricePending:item.configuration?.price===null,free:item.free&&podUnitPrice(item)===0});let child=0;
    for(const addon of item.addons||[])rows.push({kind:'item',isAddon:true,indexLabel:index+'.'+(++child),description:addonDescription(item,addon),dimensions:'',qty:addon.qty,price:addon.price===null?0:num(addon.price),pricePending:addon.price===null,free:false,height:0,columns:1,images:addonImages(item,addon)});
  }
  return rows;
}
function rowAmount(row){return row.free||row.pricePending?0:Math.round(num(row.qty)*cents(row.price));}
function calculate(s=state){
  const rows=quoteRows(s),subtotal=rows.reduce((sum,row)=>sum+(row.kind==='item'?rowAmount(row):0),0);
  const fees=cents(s.delivery)+cents(s.installation)+cents(s.handlingFee),discount=Math.min(subtotal+fees,cents(s.discount));
  const tax=Math.round((subtotal+fees-discount)*Math.min(100,num(s.tax))/100);
  return{subtotal,fees,discount,tax,total:subtotal+fees-discount+tax,pending:rows.some(row=>row.pricePending)};
}
function itemSubtotal(item){return calculate({...state,items:[item],delivery:0,installation:0,handlingFee:0,discount:0,tax:0});}
function standardCharges(s=state){
  const items=s.items.filter(item=>item.kind==='item');if(s.handling==='STAIRCASE')return null;if(!items.length||items.some(item=>!modelFor(item)))return null;
  const rates=new Set(items.map(item=>modelFor(item).delivery));if(rates.size!==1)return null;
  return{delivery:[...rates][0],installation:items.reduce((sum,item)=>sum+num(item.qty)*modelFor(item).installation,0)};
}
function invalidateCharges(){state.chargesConfirmed=false;if(state.chargesMode==='standard'){const rates=standardCharges();if(rates){state.delivery=rates.delivery;state.installation=rates.installation;}else state.chargesMode='manual';}}
function useStandardCharges(){const rates=standardCharges();if(!rates)throw Error('Enter delivery and installation charges manually for custom items.');Object.assign(state,rates,{chargesMode:'standard',chargesConfirmed:true});}
function issuesForQuote(s=state){
  const errors=[];const issue=(step,field,message,itemId)=>errors.push({step,field,message,itemId});
  if(!s.customer.trim())issue(0,'customer','Enter the customer or company name.');
  if(!s.items.some(item=>item.kind==='item'))issue(1,'items','Add at least one pod or item.');
  for(const item of s.items){if(item.kind==='section'){if(!item.description.trim())issue(1,'description','Enter a section heading.',item.id);continue;}
    if(!item.description.trim())issue(1,'description','Choose a pod or enter an item description.',item.id);
    if(!Number.isFinite(Number(item.qty))||num(item.qty)<=0)issue(1,'qty','Quantity must be greater than zero.',item.id);
    if(modelFor(item)&&!Number.isInteger(num(item.qty)))issue(1,'qty','Enter a whole number of pods.',item.id);
    if(!item.free&&(!Number.isFinite(Number(item.price))||Number(item.price)<=0))issue(1,'price','Enter a unit price or mark this item as FREE.',item.id);
    if(item.configuration&&(item.configuration.price===null||!Number.isFinite(Number(item.configuration.price))||Number(item.configuration.price)<0))issue(1,'configurationPrice','Enter the agreed price for '+item.configuration.label+'.',item.id);
    for(const addon of item.addons||[]){if(!addon.label.trim())issue(1,'addons','Name the custom extra.',item.id);if(addon.price===null||!Number.isFinite(Number(addon.price))||Number(addon.price)<0)issue(1,'addons','Enter the price for '+(addon.label||'the custom extra')+'.',item.id);if(num(addon.qty)<=0)issue(1,'addons','Enter a quantity for '+(addon.label||'the extra')+'.',item.id);}
  }
  if(!s.date)issue(2,'date','Choose a quotation date.');if(!s.reference.trim())issue(2,'reference','Enter a quote reference.');
  if(!s.chargesConfirmed)issue(2,'chargesConfirmed','Review and confirm delivery and installation charges.');
  for(const key of ['delivery','installation','handlingFee','discount','tax'])if(!Number.isFinite(Number(s[key]))||Number(s[key])<0)issue(2,key,'Enter a valid '+key+' amount.');
  if(num(s.tax)>100)issue(2,'tax','Tax must be between 0% and 100%.');
  const totals=calculate(s);if(cents(s.discount)>totals.subtotal+totals.fees)issue(2,'discount','Discount cannot exceed the amount before tax.');
  if(!Number.isSafeInteger(totals.total))issue(2,'items','This total is too large to calculate safely.');
  return errors;
}
function restoreDraft(raw){
  if(!raw||!['ace-quotation-v1','ace-quotation-v2'].includes(raw.format)||!raw.data||!Array.isArray(raw.data.items)||raw.data.items.length>200)throw Error('Choose an Ace quotation draft (.json).');
  const base=defaults(),data=raw.data;
  for(const key of Object.keys(base)){if(key==='items')continue;if(typeof base[key]==='string'){if(typeof data[key]==='string')base[key]=data[key].slice(0,12000);}else if(typeof base[key]==='boolean'){base[key]=typeof data[key]==='boolean'?data[key]:base[key];}else if(data[key]!==undefined)base[key]=num(data[key]);}
  base.items=data.items.map(item=>{
    if(!item||!['item','section'].includes(item.kind))throw Error('Invalid item in this draft.');
    const out={...newItem(),kind:item.kind,description:String(item.description||'').slice(0,12000),dimensions:String(item.dimensions||'').slice(0,3000),qty:num(item.qty),price:num(item.price),height:Math.min(230,num(item.height)),free:item.free===true,columns:Number(item.columns)===2?2:1,images:[]};
    if(typeof item.id==='string'&&/^[a-zA-Z0-9_-]{1,100}$/.test(item.id))out.id=item.id;
    if(WEBSITE_PRICE_PRESETS.some(p=>p.key===item.pricePreset))out.pricePreset=item.pricePreset;
    if(!Array.isArray(item.images)||item.images.length>12)throw Error('Invalid image list in this draft.');
    for(const image of item.images){if(!image||typeof image.data!=='string'||!/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=\s]+$/.test(image.data))throw Error('Invalid photo in this draft.');out.images.push({name:String(image.name||'Product photo').slice(0,200),data:image.data,...(isManagedPodPhoto(image)?{preset:image.preset}:{})});}
    if(item.configuration&&typeof item.configuration.label==='string')out.configuration={id:String(item.configuration.id||''),label:item.configuration.label.slice(0,500),price:item.configuration.price===null?null:num(item.configuration.price),quoteRequired:!!item.configuration.quoteRequired,includesSofa:!!item.configuration.includesSofa};
    if(item.addons!==undefined&&(!Array.isArray(item.addons)||item.addons.length>40))throw Error('A draft can contain up to 40 extras per item.');
    out.addons=(item.addons||[]).map(addon=>({id:String(addon.id||newId()).slice(0,120),label:String(addon.label||'').slice(0,500),price:addon.price===null?null:num(addon.price),qty:num(addon.qty),followQuantity:addon.followQuantity!==false,kind:addon.kind==='sofa'?'sofa':'other',custom:!!addon.custom}));
    return out;
  });
  const ids=new Set();for(const item of base.items){if(ids.has(item.id))item.id=newId();ids.add(item.id);}
  return base;
}
const draftPayload=()=>({format:'ace-quotation-v2',savedAt:new Date().toISOString(),data:clone(state)});
