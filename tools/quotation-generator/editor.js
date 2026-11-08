let currentStep=0,activeItemId=state.items[0]?.id||null,saveTimer,editVersion=0,localSavedVersion=-1,storageUnavailable=false;
const steps=['Customer','Pods & extras','Delivery & review'];
function element(tag,className='',content){const node=document.createElement(tag);if(className)node.className=className;if(content!==undefined)node.textContent=content;return node;}
function action(label,handler,className=''){const button=element('button',className,label);button.type='button';button.addEventListener('click',handler);return button;}
function setStatus(message){$('status').textContent=message;}
function setMessage(message){$('message').textContent=message;}
function readNumber(value){if(value==='')return null;const result=Number(value);return Number.isFinite(result)?result:null;}
function clearError(input){input.removeAttribute('aria-invalid');setMessage('');}
function showMobile(view){document.body.dataset.mobileView=view;document.querySelectorAll('[data-mobile-tab]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.mobileTab===view)));}
function showStep(index,{clear=true}={}){
  currentStep=Math.max(0,Math.min(2,index));showMobile('edit');
  document.querySelectorAll('[data-panel]').forEach(panel=>panel.hidden=Number(panel.dataset.panel)!==currentStep);
  document.querySelectorAll('[data-step]').forEach(button=>{if(Number(button.dataset.step)===currentStep)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');});
  $('backStep').hidden=currentStep===0;$('nextStep').hidden=currentStep===2;$('downloadPdf').hidden=currentStep!==2;
  $('nextStep').textContent=currentStep===0?'Next: pods & extras →':'Next: delivery & review →';$('footerMeta').textContent=`Step ${currentStep+1} of 3`;
  if(clear)setMessage('');$('editorScroll').scrollTop=0;if(currentStep===2)renderReview();
}
function syncFields(){
  document.querySelectorAll('[data-field]').forEach(input=>{const key=input.dataset.field;if(input.type==='checkbox')input.checked=!!state[key];else input.value=state[key]??'';});
  syncDeliveryAddress();$('referenceLabel').textContent='Draft reference: '+state.reference;
}
function syncDeliveryAddress(){
  $('deliveryAddressFields').hidden=state.sameAddress;$('sameAddressPreview').hidden=!state.sameAddress;
  $('sameAddressPreview').textContent=state.address||'No billing address entered. Untick the box to add a delivery address.';
}
function changed({pricing=false}={}){
  dirty=true;editVersion++;clearTimeout(renderTimer);clearTimeout(saveTimer);setMessage('');
  if(pricing){invalidateCharges();for(const key of ['delivery','installation','chargesConfirmed']){const input=document.querySelector(`[data-field="${key}"]`);if(input){if(input.type==='checkbox')input.checked=state[key];else input.value=state[key];}}}
  $('referenceLabel').textContent='Draft reference: '+state.reference;syncDeliveryAddress();renderReview();refreshItemSummaries();
  renderTimer=setTimeout(()=>{render();renderReview();},100);saveTimer=setTimeout(saveLocally,650);setStatus('Saving draft on this device…');
}
function refreshItemSummaries(){
  for(const item of state.items){const card=document.getElementById('card-'+item.id);if(!card)continue;const title=card.querySelector('[data-summary-title]'),description=card.querySelector('[data-summary-detail]'),amount=card.querySelector('[data-summary-amount]');
    if(title)title.textContent=item.kind==='section'?item.description||'Section heading':itemLabel(item);
    if(description&&item.kind==='item'){const extras=(item.addons||[]).length;description.textContent=`${num(item.qty)} ${num(item.qty)===1?'unit':'units'}${extras?' · '+extras+' '+(extras===1?'add-on':'add-ons'):''}`;}
    if(amount&&item.kind==='item'){const total=itemSubtotal(item);amount.textContent=total.pending?'Price to confirm':money(total.subtotal);}
    const unitPrice=card.querySelector('.unit-price strong');if(unitPrice)unitPrice.textContent=item.configuration?.price===null?'To confirm':podUnitPrice(item)===0&&item.free?'FREE':money(cents(podUnitPrice(item)));
  }
  const total=calculate();$('itemsSubtotal').textContent=total.pending?'Price to confirm':money(total.subtotal);
}
function itemControl(item,label,key,{type='text',wide=false,onInput,min='0',step='0.01',max='999999999',placeholder=''}={}){
  const wrapper=element('label',wide?'wide':'');wrapper.append(element('span','',label));
  const input=element(type==='textarea'?'textarea':'input');if(type!=='textarea')input.type=type;
  input.id='item-'+item.id+'-'+key;input.dataset.itemField=key;input.dataset.itemId=item.id;input.value=item[key]??'';input.placeholder=placeholder;
  if(type==='number'){input.min=min;input.max=max;input.step=step;}else input.maxLength=key==='description'?12000:3000;
  input.addEventListener('input',()=>{clearError(input);if(onInput)onInput(input);else{item[key]=type==='number'?readNumber(input.value):input.value;changed();}});wrapper.append(input);return wrapper;
}
function selectModelControl(item){
  const label=element('label');label.textContent='Pod model';const select=element('select');select.id='item-'+item.id+'-model';select.dataset.itemId=item.id;select.dataset.itemField='model';
  const placeholder=element('option','','Choose a pod…');placeholder.value='';placeholder.disabled=true;select.append(placeholder);
  for(const model of WEBSITE_PRICE_PRESETS){const option=element('option','',model.label+' — '+money(cents(model.price)));option.value=model.key;select.append(option);}
  const custom=element('option','','Custom item / older model');custom.value='custom';select.append(custom);select.value=item.pricePreset||(item.description||item.images.length?'custom':'');
  select.addEventListener('change',()=>{try{if(select.value==='custom')useCustomItem(item);else applyWebsitePricePreset(item,select.value);changed({pricing:true});renderItems();document.getElementById('item-'+item.id+'-qty')?.focus();}catch(error){setMessage(error.message);}});label.append(select);return label;
}
function configurationEditor(item,model){
  if(!model.configurations.length&&!item.configuration)return null;
  const wrap=element('div','config-select');const label=element('label');label.textContent='Setup · choose one';const select=element('select');select.id='item-'+item.id+'-configuration';
  const empty=element('option','','Pod only — no extra setup');empty.value='';select.append(empty);
  for(const config of model.configurations){const option=element('option','',config.label+' — '+(config.price===null?'confirm price':money(cents(config.price))+' / pod'));option.value=config.id;select.append(option);}
  if(item.configuration&&!model.configurations.some(c=>c.id===item.configuration.id)){const option=element('option','',item.configuration.label+' (saved setup)');option.value=item.configuration.id;select.append(option);}
  select.value=item.configuration?.id||'';select.addEventListener('change',()=>{try{selectConfiguration(item,select.value);changed();renderItems();document.getElementById(select.id)?.focus({preventScroll:true});}catch(error){setMessage(error.message);}});label.append(select);wrap.append(label);
  if(item.configuration){const extra=element('details','advanced');if(item.configuration.price===null)extra.open=true;const summary=element('summary','',item.configuration.price===null?'Enter the agreed setup price':'Edit setup price');extra.append(summary);
    const priceLabel=element('label');priceLabel.textContent='Setup price per pod (RM)';const price=element('input');price.type='number';price.min='0';price.max='999999999';price.step='.01';price.value=item.configuration.price??'';price.placeholder='Agreed price';price.id='item-'+item.id+'-configurationPrice';price.dataset.itemId=item.id;price.dataset.itemField='configurationPrice';price.addEventListener('input',()=>{item.configuration.price=readNumber(price.value);clearError(price);changed();});priceLabel.append(price);extra.append(priceLabel);wrap.append(extra);
  }
  return wrap;
}
function selectedAddonFields(item,addon){
  const fields=element('div','addon-fields');
  for(const [key,label]of [['qty','Total qty'],['price','Unit price (RM)']]){const wrapper=element('label');wrapper.textContent=label;const input=element('input');input.type='number';input.min=key==='qty'?'1':'0';input.max='999999999';input.step=key==='qty'?'1':'.01';input.value=addon[key]??'';input.id='item-'+item.id+'-addon-'+addon.id+'-'+key;input.dataset.itemField='addons';input.dataset.itemId=item.id;
    input.addEventListener('input',()=>{addon[key]=readNumber(input.value);if(key==='qty')addon.followQuantity=false;clearError(input);changed();});wrapper.append(input);fields.append(wrapper);
  }
  return fields;
}
function addonsEditor(item){
  const model=modelFor(item),section=element('div','option-section');section.append(element('h3','','Add-ons'));
  if(model?.addons.length)section.append(element('p','helper','Choose extras. Quantities shown are totals for this quotation.'));
  for(const option of model?.addons||[]){
    const row=element('div','addon-option');const included=item.configuration?.includesSofa&&option.kind==='sofa';
    if(included){row.classList.add('included');row.append(element('span','included-badge','Included'),element('span','',option.label));section.append(row);continue;}
    const selected=item.addons.find(a=>a.id===option.id),label=element('label');const checkbox=element('input');checkbox.type='checkbox';checkbox.checked=!!selected;checkbox.id='item-'+item.id+'-addon-'+option.id;checkbox.dataset.addonId=option.id;checkbox.addEventListener('change',()=>{try{toggleAddon(item,option.id,checkbox.checked);changed();renderItems();document.getElementById(checkbox.id)?.focus({preventScroll:true});}catch(error){setMessage(error.message);}});
    label.append(checkbox);if(option.image){const photo=element('img','addon-photo');photo.src=option.image;photo.alt=option.label;label.append(photo);}label.append(element('span','',option.label),element('span','option-price',money(cents(option.price))));row.append(label);if(selected)row.append(selectedAddonFields(item,selected));section.append(row);
  }
  const custom=item.addons.filter(a=>a.custom||!model?.addons.some(option=>option.id===a.id));
  for(const addon of custom){const row=element('div','custom-extra');const label=element('label');label.textContent='Extra description';const name=element('input');name.value=addon.label;name.maxLength=500;name.dataset.itemField='addons';name.dataset.itemId=item.id;name.placeholder='e.g. Additional electrical work';name.addEventListener('input',()=>{addon.label=name.value;clearError(name);changed();});label.append(name);row.append(label,selectedAddonFields(item,addon));row.append(action('Remove extra',()=>{item.addons=item.addons.filter(a=>a.id!==addon.id);changed();renderItems();},'quiet-button danger remove-extra'));section.append(row);}
  section.append(action('+ Custom extra',()=>{if(item.addons.length>=40){setMessage('Use up to 40 extras per item.');return;}item.addons.push({id:'custom-'+newId(),label:'',price:null,qty:num(item.qty)||1,followQuantity:true,kind:'other',custom:true});changed();renderItems();const card=document.getElementById('card-'+item.id);card.querySelector('.custom-extra:last-of-type input')?.focus();},'quiet-button'));
  return section;
}
function photoTools(item){
  const container=element('div','field-stack');
  if(!item.pricePreset){const legacy=element('details','advanced');legacy.append(element('summary','','Photos from the original quotation'));const options=element('div','image-tools');for(const photo of POD_PHOTOS){const button=action('Use '+photo.label+' photo',()=>{try{setPodPhoto(item,photo.key);changed();renderItems();}catch(error){setMessage(error.message);}});options.append(button);}legacy.append(options);container.append(legacy);}
  const label=element('label');label.textContent='Add product photos';const file=element('input');file.type='file';file.accept='image/png,image/jpeg,image/webp';file.multiple=true;file.setAttribute('aria-label','Upload photos for '+itemLabel(item));
  file.addEventListener('change',async()=>{try{const files=[...file.files];if(item.images.length+files.length>12)throw Error('Use up to 12 photos per item.');setStatus('Adding photos…');const images=[];for(const selected of files)images.push(await readImage(selected));item.images.push(...images);changed();renderItems();}catch(error){setMessage(error.message);}});label.append(file);container.append(label);
  if(item.images.length){const thumbnails=element('div','thumbnails');item.images.forEach((image,index)=>{const thumb=element('div','thumb');const photo=element('img');photo.src=image.data;photo.alt=image.name;thumb.append(photo,action('Remove',()=>{item.images.splice(index,1);changed();renderItems();},'quiet-button'));if(index>0)thumb.append(action('← Earlier',()=>{[item.images[index-1],item.images[index]]=[item.images[index],item.images[index-1]];changed();renderItems();},'quiet-button'));thumbnails.append(thumb);});container.append(thumbnails);}
  return container;
}
function itemAdvanced(item,index){
  const advanced=element('details','advanced');advanced.id='item-'+item.id+'-advanced';advanced.append(element('summary','',item.pricePreset?'Description, price & photos':'Dimensions & photos'));
  const fields=element('div','field-stack');
  if(item.pricePreset)fields.append(itemControl(item,'Description','description',{type:'textarea'}),itemControl(item,'Base pod price before setup (RM)','price',{type:'number'}));
  fields.append(itemControl(item,'Dimensions','dimensions',{type:'textarea',placeholder:'Width x depth x height in mm'}));
  const freeLabel=element('label','check-label');const free=element('input');free.type='checkbox';free.checked=item.free;free.addEventListener('change',()=>{item.free=free.checked;changed();renderItems();});freeLabel.append(free,element('span','','Base pod / item is FREE'));fields.append(freeLabel,photoTools(item));
  const layout=element('details','advanced');layout.append(element('summary','','Photo layout & item order'));const grid=element('div','field-grid');grid.append(itemControl(item,'Minimum row height (mm; 0 = auto)','height',{type:'number',step:'any',max:'230'}));const columns=element('label');columns.textContent='Photo columns';const select=element('select');for(const n of [1,2]){const option=element('option','',String(n));option.value=n;select.append(option);}select.value=item.columns;select.addEventListener('change',()=>{item.columns=Number(select.value);changed();});columns.append(select);grid.append(columns);layout.append(grid);const order=element('div','image-tools');order.append(action('Move item up',()=>moveItem(index,-1)),action('Move item down',()=>moveItem(index,1)));layout.append(order);fields.append(layout);advanced.append(fields);return advanced;
}
function renderItems(){
  const focusId=document.activeElement?.id;const list=$('itemList');list.replaceChildren();
  state.items.forEach((item,index)=>{
    const open=item.id===activeItemId,card=element('article','pod-card'+(open?' expanded':'')+(item.kind==='section'?' section-heading-card':''));card.id='card-'+item.id;card.dataset.itemId=item.id;
    const summary=element('div','pod-summary');
    if(item.kind!=='section'){if(item.images[0]){const photo=element('img');photo.src=item.images[0].data;photo.alt='';summary.append(photo);}else summary.append(element('span','no-photo','+'));}
    const text=element('div');const title=element('h3','',item.kind==='section'?item.description||'Section heading':itemLabel(item));title.dataset.summaryTitle='';text.append(title);
    if(item.kind!=='section'){const detail=element('p');detail.dataset.summaryDetail='';const amount=element('strong');amount.dataset.summaryAmount='';text.append(detail,amount);}summary.append(text);
    const edit=action(open?'Close':'Edit',()=>{activeItemId=open?null:item.id;renderItems();});edit.setAttribute('aria-expanded',String(open));edit.setAttribute('aria-controls','editor-'+item.id);summary.append(edit);card.append(summary);
    const editor=element('div','pod-editor');editor.id='editor-'+item.id;editor.hidden=!open;
    if(item.kind==='section')editor.append(itemControl(item,'Section heading','description',{type:'textarea'}));
    else{
      const primary=element('div','field-grid');primary.append(selectModelControl(item),itemControl(item,'Quantity','qty',{type:'number',min:'1',step:item.pricePreset?'1':'any',max:'100000',onInput:input=>{updateItemQuantity(item,readNumber(input.value));clearError(input);for(const addon of item.addons)if(addon.followQuantity!==false){const field=document.getElementById('item-'+item.id+'-addon-'+addon.id+'-qty');if(field)field.value=addon.qty;}changed({pricing:true});}}));editor.append(primary);
      if(item.pricePreset){const price=element('div','unit-price');price.append(element('span','',item.configuration?'Pod + setup · per unit':'Pod price · per unit'),element('strong','',item.configuration?.price===null?'To confirm':podUnitPrice(item)===0&&item.free?'FREE':money(cents(podUnitPrice(item)))));editor.append(price);const configuration=configurationEditor(item,modelFor(item));if(configuration)editor.append(configuration);}
      else editor.append(itemControl(item,'Item description','description',{type:'textarea',placeholder:'What are you quoting?'}),itemControl(item,'Unit price (RM)','price',{type:'number'}));
      if(item.pricePreset||item.description.trim()||item.addons.length)editor.append(addonsEditor(item));
      editor.append(itemAdvanced(item,index));
    }
    const controls=element('div','item-actions');controls.append(action('Remove item',()=>removeItem(index),'quiet-button danger'),action('Done with this item',()=>{activeItemId=null;renderItems();}));editor.append(controls);card.append(editor);list.append(card);
  });
  refreshItemSummaries();if(focusId)document.getElementById(focusId)?.focus({preventScroll:true});
}
function removeItem(index){const removed=clone(state.items[index]);state.items.splice(index,1);if(activeItemId===removed.id)activeItemId=state.items[index]?.id||state.items[index-1]?.id||null;changed({pricing:true});renderItems();showItemNotice('Item removed.',()=>{state.items.splice(Math.min(index,state.items.length),0,removed);activeItemId=removed.id;changed({pricing:true});renderItems();});}
function showItemNotice(message,undo){let notice=$('itemNotice');if(!notice){notice=element('div','review-alert');notice.id='itemNotice';$('itemList').before(notice);}notice.replaceChildren(element('span','',message+' '));if(undo)notice.append(action('Undo',()=>{undo();notice.remove();},'quiet-button'));}
function moveItem(index,direction){const next=index+direction;if(next<0||next>=state.items.length)return;[state.items[index],state.items[next]]=[state.items[next],state.items[index]];changed();renderItems();}
function renderReview(){
  const total=calculate();$('itemsSubtotal').textContent=total.pending?'Price to confirm':money(total.subtotal);
  const items=$('reviewItems');items.replaceChildren();for(const item of state.items.filter(i=>i.kind==='item')){const row=element('div','review-item');const amount=itemSubtotal(item);row.append(element('span','',`${itemLabel(item)} × ${num(item.qty)} · ${amount.pending?'confirm price':money(amount.subtotal)}`),action('Edit',()=>{activeItemId=item.id;renderItems();showStep(1);},'quiet-button'));items.append(row);}
  const totals=$('reviewTotals');totals.replaceChildren();const add=(label,value,grand=false)=>{const row=element('div','summary-line'+(grand?' grand':''));row.append(element('span','',label),element('strong','',value));totals.append(row);};
  add('Pods & extras',total.pending?'To confirm':money(total.subtotal));add('Delivery',money(cents(state.delivery)));add('Installation',money(cents(state.installation)));if(num(state.handlingFee))add('Handling',money(cents(state.handlingFee)));if(total.discount)add('Discount','− '+money(total.discount));if(num(state.tax))add('Tax ('+num(state.tax)+'%)',money(total.tax));add('Quotation total',total.pending?'To confirm':money(total.total),true);
  const errors=issuesForQuote();const readiness=$('reviewReadiness');readiness.replaceChildren();
  if(layoutError)readiness.append(element('div','review-alert',layoutError));else if(errors.length){const alert=element('div','review-alert');alert.append(element('p','',errors.length===1?'One detail needs attention.':errors.length+' details need attention.'),action('Check what’s missing',()=>displayIssue(errors[0]),'quiet-button'));readiness.append(alert);}else readiness.append(element('p','review-ready','Ready to download.'));
  const rates=standardCharges();$('useStandardRates').disabled=!rates;$('standardRatesHint').textContent=rates?'One standard Klang Valley delivery trip: '+money(cents(rates.delivery))+'. Installation for these pods: '+money(cents(rates.installation))+'. For lift or ground-floor access; review unusual access separately.':state.handling==='STAIRCASE'?'Staircase access needs delivery, installation and handling charges reviewed manually.':'Custom or legacy items need delivery and installation charges entered manually.';
}
function openAncestors(node){let parent=node?.parentElement;while(parent){if(parent.tagName==='DETAILS')parent.open=true;parent=parent.parentElement;}}
function displayIssue(error){
  if(error.itemId){activeItemId=error.itemId;renderItems();}showStep(error.step,{clear:false});setMessage(error.message);
  let target=error.itemId?document.querySelector(`[data-item-id="${error.itemId}"][data-item-field="${error.field}"]`):document.querySelector(`[data-field="${error.field}"]`);
  if(!target&&error.itemId)target=document.getElementById('item-'+error.itemId+'-model');
  if(target){openAncestors(target);target.setAttribute('aria-invalid','true');target.focus({preventScroll:true});target.scrollIntoView?.({block:'nearest',behavior:'smooth'});}else $('message').scrollIntoView?.({block:'nearest'});
}
function validate(){render();const errors=issuesForQuote();if(errors.length){displayIssue(errors[0]);return false;}if(layoutError){showStep(2);setMessage(layoutError);return false;}setMessage('');return true;}
function download(blob,name){const url=URL.createObjectURL(blob),anchor=document.createElement('a');anchor.href=url;anchor.download=name;anchor.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function fileName(){return(state.reference.trim()||'Ace-quotation').replace(/[^a-zA-Z0-9_-]/g,'-');}
async function readImage(file){
  if(file.size>20*1024*1024)throw Error('Each photo must be under 20 MB.');if(!['image/png','image/jpeg','image/webp'].includes(file.type))throw Error('Choose a PNG, JPEG or WebP photo.');
  const raw=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(Error('This photo could not be read. Try another file.'));reader.readAsDataURL(file);});
  const image=await loadImage(raw),scale=Math.min(1,1800/Math.max(image.width,image.height)),target=document.createElement('canvas');target.width=Math.max(1,Math.round(image.width*scale));target.height=Math.max(1,Math.round(image.height*scale));target.getContext('2d').drawImage(image,0,0,target.width,target.height);return{name:file.name,data:target.toDataURL('image/png')};
}
let databasePromise;
function draftDatabase(){
  if(!globalThis.indexedDB)return Promise.reject(Error('Browser draft storage is unavailable.'));
  if(!databasePromise)databasePromise=new Promise((resolve,reject)=>{const request=indexedDB.open('ace-quotation-generator',1);request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains('drafts'))request.result.createObjectStore('drafts');};request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);request.onblocked=()=>reject(Error('Draft storage is busy.'));});return databasePromise;
}
async function writeLocalDraft(payload){const db=await draftDatabase();return new Promise((resolve,reject)=>{const tx=db.transaction('drafts','readwrite');tx.objectStore('drafts').put(payload,'current');tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||Error('Draft could not be saved.'));});}
async function saveLocally(){const version=editVersion;try{await writeLocalDraft(draftPayload());localSavedVersion=Math.max(localSavedVersion,version);storageUnavailable=false;if(version===editVersion)setStatus('Draft saved on this device.');}catch{storageUnavailable=true;setStatus('Use Save draft to keep a copy of your changes.');}}
async function restoreLocalDraft(){
  try{const db=await draftDatabase();const raw=await new Promise((resolve,reject)=>{const tx=db.transaction('drafts','readonly'),request=tx.objectStore('drafts').get('current');request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});if(!raw||dirty)return;state=restoreDraft(raw);$('itemNotice')?.remove();activeItemId=state.items[0]?.id||null;syncFields();renderItems();render();renderReview();localSavedVersion=editVersion;setStatus('Restored the last draft from this device.');}catch{storageUnavailable=true;setStatus('Use Save draft to keep your changes.');}
}
document.querySelectorAll('[data-field]').forEach(input=>input.addEventListener('input',()=>{
  const key=input.dataset.field;state[key]=input.type==='checkbox'?input.checked:input.type==='number'?(readNumber(input.value)??0):input.value;
  if(['delivery','installation','handlingFee','address','deliveryAddress','sameAddress','floor','handling'].includes(key)){state.chargesMode='manual';state.chargesConfirmed=false;document.querySelector('[data-field="chargesConfirmed"]').checked=false;}
  clearError(input);changed();
}));
document.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>showStep(Number(button.dataset.step))));
document.querySelectorAll('[data-mobile-tab]').forEach(button=>button.addEventListener('click',()=>showMobile(button.dataset.mobileTab)));
$('backStep').addEventListener('click',()=>showStep(currentStep-1));
$('nextStep').addEventListener('click',()=>{const first=issuesForQuote().find(error=>error.step===currentStep);if(first){displayIssue(first);return;}showStep(currentStep+1);});
$('addItem').addEventListener('click',()=>{if(state.items.length>=200){setMessage('A quotation can contain up to 200 items.');return;}const item=newItem();state.items.push(item);activeItemId=item.id;changed({pricing:true});renderItems();document.getElementById('item-'+item.id+'-model')?.focus();});
$('addSection').addEventListener('click',()=>{if(state.items.length>=200){setMessage('A quotation can contain up to 200 items.');return;}const item={...newItem(),kind:'section'};state.items.push(item);activeItemId=item.id;changed();renderItems();document.getElementById('item-'+item.id+'-description')?.focus();});
$('useStandardRates').addEventListener('click',()=>{try{useStandardCharges();syncFields();changed();setStatus('Standard Klang Valley charges applied.');}catch(error){setMessage(error.message);}});
$('saveDraft').addEventListener('click',()=>{download(new Blob([JSON.stringify(draftPayload(),null,2)],{type:'application/json'}),fileName()+'.json');dirty=false;setStatus('Editable draft downloaded.');});
$('openDraft').addEventListener('change',async event=>{const file=event.target.files[0];if(!file)return;try{if(file.size>80*1024*1024)throw Error('This draft is too large (maximum 80 MB).');const next=restoreDraft(JSON.parse(await file.text()));if(dirty&&localSavedVersion!==editVersion&&!confirm('Replace the current unsaved draft?'))return;state=next;$('itemNotice')?.remove();activeItemId=state.items[0]?.id||null;syncFields();renderItems();showStep(0);changed();$('moreMenu').open=false;setStatus('Draft opened.');}catch(error){setMessage(error.message);}finally{event.target.value='';}});
$('newQuote').addEventListener('click',()=>{if(dirty&&!confirm('Start a new quotation? Use Save draft first if you need to keep this one.'))return;const sellerKeys=['companyName','companyRef','companyAddress','companyPhone','companyEmail','websites','bank','bankName','bankAccount','agent','signatory'];const seller=Object.fromEntries(sellerKeys.map(key=>[key,state[key]]));state={...defaults(),...seller};$('itemNotice')?.remove();activeItemId=state.items[0].id;syncFields();renderItems();showStep(0);changed();$('moreMenu').open=false;setStatus('New quotation started.');});
$('printQuote').addEventListener('click',async()=>{if(!validate())return;await document.fonts.ready;$('moreMenu').open=false;window.print();});
$('downloadPdf').addEventListener('click',async()=>{
  if(!validate())return;const button=$('downloadPdf');button.disabled=true;button.textContent='Preparing PDF…';
  try{await document.fonts.ready;const snapshots=pages.map(page=>page.svg.cloneNode(true)),name=fileName(),images=[];for(const svg of snapshots)images.push(await svgToJpeg(svg));download(makePdf(images),name+'.pdf');setStatus('Quotation PDF downloaded.');}
  catch(error){setMessage('PDF export failed: '+error.message);}finally{button.disabled=false;button.textContent='Download quotation PDF';}
});
window.addEventListener('beforeunload',event=>{if(dirty&&localSavedVersion!==editVersion){event.preventDefault();event.returnValue='';}});
window.quoteApp={get state(){return state;},get step(){return currentStep;},setState(value){state=restoreDraft({format:'ace-quotation-v2',data:value});$('itemNotice')?.remove();activeItemId=state.items[0]?.id||null;syncFields();renderItems();render();renderReview();},calculate,quoteRows,issuesForQuote,restoreDraft,render,showStep,applyWebsitePricePreset,toggleAddon,selectConfiguration,updateItemQuantity,standardCharges};
syncFields();renderItems();showStep(0);renderReview();$('catalogueDate').textContent='Website price snapshot checked '+displayDate(WEBSITE_PRICE_SOURCE.checkedOn)+'.';
Promise.all([document.fonts.load('400 5.28px QuoteAssistant'),document.fonts.load('700 5.28px QuoteAssistant')]).then(()=>{render();renderReview();restoreLocalDraft();}).catch(()=>{render();setStatus('The quotation font could not load. Reopen this file before exporting.');});
