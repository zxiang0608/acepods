// Shared A4 document engine for the local editor and customer preliminary quotations.
export function createQuotationDocument({state,assets:ASSETS,helpers}){
const {num,cents,formatted}=helpers;
const calculate=()=>helpers.calculate(state),quoteRows=()=>helpers.quoteRows(state);
const PW=595.2,PH=841.68,X=[18.72,41.64,140.28,316.44,403.56,446.64,472.68,511.08,569.4],NS='http://www.w3.org/2000/svg';
let pages=[];
const ctx=document.createElement('canvas').getContext('2d');
function escapeXml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));}

function fontStyle(bold=false,size=5.28){return `${bold?'700':'400'} ${size}px QuoteAssistant,Arial,sans-serif`;}

function measure(text,size=5.28,bold=false){ctx.font=fontStyle(bold,size);return ctx.measureText(text).width;}

function richLines(text,width,size=5.28){const lines=[];let bold=false;String(text||'').split('\n').forEach(paragraph=>{let line=[],used=0;const tokens=paragraph.split(/(\*\*|\s+)/);function flush(){lines.push(line);line=[];used=0;}for(const token of tokens){if(token==='**'){bold=!bold;continue;}if(!token)continue;let pieces=[token];if(measure(token,size,bold)>width){pieces=[];let part='';for(const c of token){if(part&&measure(part+c,size,bold)>width){pieces.push(part);part='';}part+=c;}if(part)pieces.push(part);}for(const piece of pieces){if(!line.length&&/^\s+$/.test(piece))continue;const w=measure(piece,size,bold);if(used+w>width&&line.length)flush();if(!line.length&&/^\s+$/.test(piece))continue;line.push({text:piece,bold,width:w});used+=w;}}flush();});return lines;}

function plainLines(text,width,size=5.28,bold=false){return richLines(String(text||'').replaceAll('**',''),width,size).map(line=>line.map(t=>t.text).join(''));}

function node(tag,attrs={},text){const n=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,v);if(text!==undefined)n.textContent=text;return n;}

function rect(svg,x,y,w,h,fill='none',stroke='#000',sw=.45){svg.append(node('rect',{x,y,width:w,height:h,fill,stroke,'stroke-width':sw}));}

function line(svg,x1,y1,x2,y2,sw=.45){svg.append(node('line',{x1,y1,x2,y2,stroke:'#000','stroke-width':sw}));}

function text(svg,value,x,y,size=5.28,bold=false,align='left',color='#000',maxWidth){let actual=size;if(maxWidth&&measure(value,size,bold)>maxWidth)actual=Math.max(3.2,size*maxWidth/measure(value,size,bold));svg.append(node('text',{x,y,'font-family':'QuoteAssistant,Arial,sans-serif','font-size':actual,'font-weight':bold?700:400,'text-anchor':align==='center'?'middle':align==='right'?'end':'start',fill:color},value));}

function richText(svg,runs,x,y,size=5.28,align='left'){
  const el=node('text',{x,y,'font-family':'QuoteAssistant,Arial,sans-serif','font-size':size,'text-anchor':align==='center'?'middle':align==='right'?'end':'start','xml:space':'preserve',fill:'#000'});
  let active=null;
  for(const run of runs){if(!active||active.bold!==run.bold){active={bold:run.bold,span:node('tspan',{'font-weight':run.bold?700:400},'')};el.append(active.span);}active.span.textContent+=run.text;}
  svg.append(el);
}

function block(svg,value,x,y,w,h,{size=5.28,bold=false,align='left',valign='middle',leading=7.44,pad=1.5,rich=false,fit=false}={}){
  const originalSize=size,originalLeading=leading;
  const wrap=()=>rich?richLines(value,w-pad*2,size):plainLines(value,w-pad*2,size,bold);
  let rows=wrap();
  while(fit&&rows.length*leading>Math.max(h-pad*2,leading)+.1&&size>3.25){size-=.15;leading=originalLeading*size/originalSize;rows=wrap();}
  if(fit&&rows.length*leading>Math.max(h-pad*2,leading)+.2)throw Error('A customer, delivery or company field is too long for the quotation header. Shorten that field.');
  const base=y+(valign==='top'?pad:(h-rows.length*leading)/2)+size;
  rows.forEach((row,i)=>{const px=align==='center'?x+w/2:align==='right'?x+w-pad:x+pad;
    if(rich)richText(svg,row,px,base+i*leading,size,align);
    else text(svg,row,px,base+i*leading,size,bold,align);
  });return rows.length*leading+pad*2;
}

function img(svg,data,x,y,w,h){svg.append(node('image',{href:data,x,y,width:w,height:h,preserveAspectRatio:'xMidYMid meet'}));}

function cell(svg,value,x,y,w,h,options={}){rect(svg,x,y,w,h,options.fill||'none');if(value)block(svg,value,x,y,w,h,{fit:true,...options});}

function createPage(first){const svg=node('svg',{viewBox:`0 0 ${PW} ${PH}`,role:'img','aria-label':'A4 quotation page'});svg.append(node('rect',{width:PW,height:PH,fill:'#fff'}));const p={svg,y:first?175.5:54.48,tableTop:first?175.5:54.48,tableBottom:first?190.86:69.84};pages.push(p);if(first)drawHeader(svg);drawTableHeader(p);return p;}

function drawHeader(svg){img(svg,ASSETS.podsLogo,40.24,54.309,58.205,31.681);img(svg,ASSETS.workplaceLogo,28.339,86.968,100.42,16.872);cell(svg,`${state.companyName}${state.companyRef?' ('+state.companyRef+')':''}`,140.28,54.48,429.12,14.64,{size:6.12,bold:true,align:'center'});cell(svg,'ADDRESS',140.28,69.12,176.16,10.8,{size:4.8,bold:true,align:'center'});cell(svg,state.companyAddress,316.44,69.12,252.96,10.8,{size:4.8,align:'center',leading:5.4});cell(svg,`TEL: ${state.companyPhone}     EMAIL: ${state.companyEmail}   WEBSITE: ${state.websites}`,140.28,79.92,429.12,11.76,{size:4.8,bold:true,align:'center',leading:5.4});text(svg,state.documentTitle||'QUOTATION',272.5,105.4,12.96,true,'center','#000',245);[['QUOTE REF:',state.reference],['DATE:',displayDate(state.date)],['SALES AGENT:',state.agent]].forEach(([label,value],i)=>{const y=91.68+i*6.8;cell(svg,label,403.56,y,43.08,6.8,{size:4.8,bold:true,align:'right',leading:5.5});cell(svg,value,446.64,y,122.76,6.8,{size:5.28,align:'center',leading:5.8});});const leftFields=[['COMP:',state.customer,8.1],['ADD:',state.address,25.2],['TEL:',state.phone,8.1],['ATTN:',state.attention,8.1],['EMAIL:',state.email,8.1]];let y=112.32;leftFields.forEach(([label,value,h])=>{text(svg,label,40.2,y+5.9,5.76,true,'right');cell(svg,value,41.64,y,274.8,h,{size:5.28,align:'center',leading:6.8});y+=h;});text(svg,'DELIVERY ADDRESS:',402,118.2,5.76,true,'right');cell(svg,state.sameAddress?state.address:state.deliveryAddress,403.56,112.32,165.84,24.48,{size:5.28,align:'center',valign:'top',leading:7.4,pad:2});[['BUILDING TYPE:',state.building||'FACTORY / SHOP LOT / RESIDENCE / OFFICE'],['DELIVER TO:',state.floor||'GRD / 1ST / 2ND / 3RD / OTHER'],['HANDLING:',state.handling||'LIFT / STAIRCASE']].forEach(([label,value],i)=>{const y=145.9+i*7.92;text(svg,label,402,y+5.9,5.76,true,'right');rect(svg,403.56,y,165.84,7.92);block(svg,value,403.56,y,165.84,7.92,{size:6.12,bold:true,align:'center',leading:7});svg.lastChild.setAttribute('fill','#f00');});}

function displayDate(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return'';const[y,m,d]=value.split('-');return `${Number(d)}/${Number(m)}/${y}`;}

function drawTableHeader(p){const titles=['NO.','DESCRIPTION','ESTIMATE VISUAL','Estimate Dimension\n(W X D X H) MM','UNIT PRICE\n(RM)','QUANTITY','TOTAL PRICE\n(RM)','GRAND TOTAL\n(RM)'];titles.forEach((v,i)=>cell(p.svg,v,X[i],p.y,X[i+1]-X[i],15.36,{size:i===5?4.6:5.28,bold:true,align:'center',leading:6.2,pad:1}));p.y+=15.36;}

function itemHeight(item){if(item.kind==='section')return 14.4;const desc=richLines(item.description,95.64).length*7.44+10;const dim=plainLines(item.dimensions,84.12).length*7.44+10;const visual=item.images.length&&!num(item.height)?(item.isAddon?76:120):0;return Math.max(item.isAddon?22:40,desc,dim,visual,num(item.height)*72/25.4);}

function drawItem(p,item,index,h){const y=p.y;if(item.kind==='section'){cell(p.svg,item.description.toUpperCase(),X[0],y,X[8]-X[0],h,{size:5.28,bold:true,align:'center',fill:'#e3eed8'});p.y+=h;p.tableBottom=p.y;return;}for(let c=0;c<8;c++)rect(p.svg,X[c],y,X[c+1]-X[c],h);block(p.svg,String(index),X[0],y,X[1]-X[0],h,{bold:true,align:'center'});block(p.svg,item.description,X[1],y,X[2]-X[1],h,{rich:true});block(p.svg,item.dimensions,X[3],y,X[4]-X[3],h,{align:'center',size:5.04});const amount=item.free?0:Math.round(num(item.qty)*cents(item.price));block(p.svg,item.pricePending?'To confirm':item.free?'FREE':formatted(cents(item.price)),X[4],y,X[5]-X[4],h,{size:5.04,bold:item.free,align:'right',pad:2});block(p.svg,String(num(item.qty)),X[5],y,X[6]-X[5],h,{size:5.04,align:'center'});block(p.svg,item.pricePending?'To confirm':item.free?'FREE':formatted(amount),X[6],y,X[7]-X[6],h,{size:5.04,bold:true,align:'right',pad:2});if(item.images.length){const cols=Math.min(Number(item.columns)||1,item.images.length,2),rows=Math.ceil(item.images.length/cols);const cw=(X[3]-X[2]-8)/cols,ch=(h-10)/rows;item.images.forEach((im,i)=>img(p.svg,im.data,X[2]+4+(i%cols)*cw,y+5+Math.floor(i/cols)*ch,cw-3,ch-3));}p.y+=h;p.tableBottom=p.y;}

function totalRows(){const t=calculate();const rows=[['Grand Total',t.pending?null:t.subtotal]];rows.push(['Transport/Delivery Charges\n(for office pods only)',state.chargesConfirmed?cents(state.delivery):null]);rows.push(['Installation Charges (for office pods)',state.chargesConfirmed?cents(state.installation):null]);if(num(state.handlingFee))rows.push(['Handling Charges',cents(state.handlingFee)]);if(t.discount)rows.push(['Discount',-t.discount]);if(num(state.tax))rows.push([`Tax (${num(state.tax)}%)`,t.tax]);rows.push(['Grand Total',t.pending||!state.chargesConfirmed?null:t.total,true]);return rows;}

function drawTotals(p){const rows=totalRows();const notes=[state.notes,state.payment?'Terms of payment:\n'+state.payment:''].filter(Boolean).join('\n\n');const h=Math.max(88,rows.reduce((s,r)=>s+(r[2]?33:18),0),richLines(notes,315).length*7.44+10);if(h>600)throw Error('Payment remarks are too long. Shorten them before exporting.');if(p.y+h>740)p=createPage(false);const y=p.y;rect(p.svg,X[0],y,X[1]-X[0],h);rect(p.svg,X[1],y,X[4]-X[1],h);block(p.svg,notes,X[1]+1,y+1,X[4]-X[1]-2,h-2,{size:5.28,rich:true});let ry=y;rows.forEach((r,i)=>{let rh=r[2]?h-(ry-y):18;cell(p.svg,r[0],X[4],ry,X[7]-X[4],rh,{size:r[2]?6.12:5.28,bold:!!r[2],align:'center'});cell(p.svg,r[1]===null?'To confirm':(r[1]<0?'-':'')+'RM'+formatted(Math.abs(r[1])),X[7],ry,X[8]-X[7],rh,{size:r[2]?6.12:5.04,bold:!!r[2],align:'right',pad:2});ry+=rh;});p.y+=h;p.tableBottom=p.y;p.y+=9;return p;}

function drawPreliminaryTerms(p){
  const terms=[
    'PRELIMINARY QUOTATION — SUBJECT TO CONFIRMATION',
    'This is an automatically generated first quotation for your selected pods and add-ons.',
    'Final specifications, finishes, availability, lead time, payment terms and tax treatment require confirmation by Ace.',
    state.chargesConfirmed?'Site charges assume one standard Klang Valley delivery trip with ground-floor or suitable lift access. Additional trips and non-standard work require review.':'Delivery, installation and handling require site review. Amounts marked To confirm are not included in a confirmed project total.',
    'This document is not an order confirmation or a request for payment.',
    'Contact Ace with this reference to confirm the final quotation.'
  ];
  for(let i=0;i<terms.length;i++){const rows=plainLines(terms[i],418,5.4,i===0);const h=rows.length*8+8;if(p.y+h>780)p=createPage(false);rows.forEach((value,j)=>text(p.svg,value,141,p.y+6+j*8,5.4,i===0));p.y+=h;}return p;
}

function drawTerms(p){if(state.preliminary)return drawPreliminaryTerms(p);function room(h){if(p.y+h>782){p=createPage(false);p.y+=3;}}function term(label,value){if(!value)return;const lines=plainLines(value,418,4.8);let start=0;while(start<lines.length){room(17);const take=Math.max(1,Math.min(lines.length-start,Math.floor((780-p.y-5)/6.4)));if(start===0)text(p.svg,label,139.5,p.y+4.8,4.8,true,'right');lines.slice(start,start+take).forEach((s,i)=>text(p.svg,s,141,p.y+4.8+i*6.4,4.8));p.y+=take*6.4+4;start+=take;}}room(20);text(p.svg,'TERMS & CONDITIONS',X[1]+1,p.y+5.5,5.76,true);p.y+=8;term('PRICE AND ITEM VALIDITY:',`${num(state.validity)} DAYS`);term('DELIVERY:',state.deliveryTerms);term('Warranty:',state.warranty);term('TRANSPORT & HANDLING CHARGE:',state.transportTerms);term('REMARKS:',state.remarks);room(61);p.y+=5;text(p.svg,'For confirmation of order, kindly bank in the funds to our bank account as below: -',141,p.y+5,5.28);p.y+=12;rect(p.svg,141,p.y,176.16,30);[['Company Name: ',state.bankName],['Bank Name: ',state.bank],['Account No: ',state.bankAccount]].forEach(([label,value],i)=>{text(p.svg,label,143,p.y+7+i*9,5.28);text(p.svg,value,143+measure(label),p.y+7+i*9,5.28,true,'left','#000',172-measure(label));});p.y+=36;room(98);text(p.svg,'We trust that the above quotation will meet your requirements and hope to receive your official order.',X[1]+1,p.y+5,4.8);p.y+=8;text(p.svg,'Should you require any further clarification, please do not hesitate to contact us immediately.',X[1]+1,p.y+5,4.8);p.y+=8;text(p.svg,'*Visuals given are approximate shape and colours',X[1]+1,p.y+5,4.8);p.y+=17;text(p.svg,'Yours faithfully,',X[1]+1,p.y+5,4.8);text(p.svg,state.companyName,X[1]+1,p.y+12,4.8,true);text(p.svg,state.signatory,X[1]+1,p.y+19,4.8,true);text(p.svg,'I hereby accept the above quotation;',403.56,p.y+5,4.8);text(p.svg,'(Please company chop & sign below)',403.56,p.y+12,4.8);line(p.svg,403.56,p.y+55,511.08,p.y+55);['NAME:','DESIGNATION:','CONTACT:','COMPANY:'].forEach((t,i)=>text(p.svg,t,405,p.y+62+i*6.4,4.8,true));return p;}

function render(){pages=[];let p=createPage(true);const rows=quoteRows();for(let rowIndex=0;rowIndex<rows.length;rowIndex++){const item=rows[rowIndex];const h=itemHeight(item);if(h>660)throw Error('An item is too tall for A4. Split its description or reduce its row height.');const firstExtra=(!item.isAddon&&rows[rowIndex+1]?.isAddon)?itemHeight(rows[rowIndex+1]):0;const reserve=h+firstExtra<=660?firstExtra:0;if(p.y+h+reserve>740)p=createPage(false);drawItem(p,item,item.indexLabel,h);}p=drawTotals(p);drawTerms(p);pages.forEach((page,i)=>{rect(page.svg,X[0],page.tableTop,X[8]-X[0],page.tableBottom-page.tableTop,'none','#000',.84);text(page.svg,`${displayDate(state.date)}`,18.96,27.5,4.8);text(page.svg,`Page ${i+1} of ${pages.length}`,576.4,27.5,4.8,false,'right');page.svg.setAttribute('aria-label',`Quotation page ${i+1} of ${pages.length}`);});return pages;}

function loadImage(src){return new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(Error('Unable to decode an image.'));im.src=src;});}

function fontCss(){return `@font-face{font-family:QuoteAssistant;src:url(${ASSETS.regular});font-weight:400}@font-face{font-family:QuoteAssistant;src:url(${ASSETS.bold});font-weight:700}`;}

async function svgToJpeg(svg){const copy=svg.cloneNode(true);const defs=node('defs');defs.append(node('style',{},fontCss()));copy.prepend(defs);copy.setAttribute('width',PW*4);copy.setAttribute('height',PH*4);const url=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(copy)],{type:'image/svg+xml;charset=utf-8'}));try{const im=await loadImage(url);const c=document.createElement('canvas');c.width=Math.round(PW*4);c.height=Math.round(PH*4);const cx=c.getContext('2d');cx.fillStyle='#fff';cx.fillRect(0,0,c.width,c.height);cx.drawImage(im,0,0,c.width,c.height);return{bytes:new Uint8Array(await(await new Promise(res=>c.toBlob(res,'image/jpeg',.98))).arrayBuffer()),width:c.width,height:c.height};}finally{URL.revokeObjectURL(url);}}

function makePdf(images){const enc=new TextEncoder(),parts=[],offsets=[0];let length=0;const add=v=>{const b=typeof v==='string'?enc.encode(v):v;parts.push(b);length+=b.length;};const count=2+images.length*3;add('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');function obj(id,body){offsets[id]=length;add(`${id} 0 obj\n`);body();add('\nendobj\n');}obj(1,()=>add('<< /Type /Catalog /Pages 2 0 R >>'));obj(2,()=>add(`<< /Type /Pages /Count ${images.length} /Kids [${images.map((_,i)=>`${3+i*3} 0 R`).join(' ')}] >>`));images.forEach((im,i)=>{const p=3+i*3,image=p+1,content=p+2;obj(p,()=>add(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PW} ${PH}] /Resources << /XObject << /I${i} ${image} 0 R >> >> /Contents ${content} 0 R >>`));obj(image,()=>{add(`<< /Type /XObject /Subtype /Image /Width ${im.width} /Height ${im.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${im.bytes.length} >>\nstream\n`);add(im.bytes);add('\nendstream');});const cmd=`q\n${PW} 0 0 ${PH} 0 0 cm\n/I${i} Do\nQ\n`;obj(content,()=>add(`<< /Length ${enc.encode(cmd).length} >>\nstream\n${cmd}endstream`));});const xref=length;add(`xref\n0 ${count+1}\n0000000000 65535 f \n`);for(let i=1;i<=count;i++)add(`${String(offsets[i]).padStart(10,'0')} 00000 n \n`);add(`trailer\n<< /Size ${count+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);return new Blob(parts,{type:'application/pdf'});}

return {render,svgToJpeg,makePdf};
}
