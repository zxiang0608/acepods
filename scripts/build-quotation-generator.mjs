import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),source=path.join(root,'tools/quotation-generator');
const names=['shell.html','styles.css','core.js','renderer.js','editor.js','assets.json','catalogue.json'];
const values=Object.fromEntries(await Promise.all(names.map(async name=>[name,await fs.readFile(path.join(source,name),'utf8')])));
const assets=JSON.parse(values['assets.json']),catalogue=JSON.parse(values['catalogue.json']);
const documentJs=(await fs.readFile(path.join(root,'src/lib/quotationDocument.js'),'utf8')).replace('export function createQuotationDocument','function createQuotationDocument');
const media=JSON.parse(await fs.readFile(path.join(source,'addon-media.json'),'utf8'));
for(const product of catalogue.products)for(const addon of product.addons)if(addon.imageSource&&!media.entries.some(entry=>entry.file===addon.imageSource&&entry.status==='approved'&&entry.role==='quotation-add-on-preview'))throw Error('Unapproved quotation add-on image: '+addon.imageSource);
const embedded=new Map();
function embed(relative){if(!embedded.has(relative))embedded.set(relative,fs.readFile(path.join(root,relative)).then(data=>'data:image/'+(path.extname(relative)==='.jpg'?'jpeg':path.extname(relative).slice(1))+';base64,'+data.toString('base64')));return embedded.get(relative);}
const presets=await Promise.all(catalogue.products.map(async product=>({...product,image:await embed(product.imageSource),addons:await Promise.all(product.addons.map(async addon=>({...addon,...(addon.imageSource?{image:await embed(addon.imageSource)}:{})})))})));
const fontCss=`@font-face{font-family:QuoteAssistant;src:url(${assets.regular});font-weight:400}@font-face{font-family:QuoteAssistant;src:url(${assets.bold});font-weight:700}`;
const fields={FONT_CSS:fontCss,STYLE_CSS:values['styles.css'],ASSETS:JSON.stringify(assets),PRESETS:JSON.stringify(presets),SOURCE:JSON.stringify(catalogue.source),CORE_JS:values['core.js'],RENDERER_JS:documentJs+'\n'+values['renderer.js'],EDITOR_JS:values['editor.js']};
const html=values['shell.html'].replace(/\{\{([A-Z_]+)\}\}/g,(_,key)=>{if(!(key in fields))throw Error('Unknown template field: '+key);return fields[key];});
await fs.writeFile(path.join(root,'quotation-generator.html'),html);
console.log('Built standalone quotation generator with guided editor, '+presets.length+' models and model-specific extras.');
