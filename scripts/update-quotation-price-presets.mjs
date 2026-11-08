// Refresh the standalone tool from canonical website data after reviewing live prices.
// Website observations and their review date belong in quotation-price-sources.json.
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath,pathToFileURL} from 'node:url';
import sharp from 'sharp';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const observations=JSON.parse(await fs.readFile(path.join(root,'quotation-price-sources.json'),'utf8'));
const seo=await import(pathToFileURL(path.join(root,'src/data/podSeoCatalog.js')));
const commercial=await import(pathToFileURL(path.join(root,'src/data/commercialTerms.js')));
async function evaluateData(relativeFile,names,bindings={}){
  const file=path.join(root,relativeFile);
  let code=await fs.readFile(file,'utf8');
  // Preserve asset paths while evaluating the site's static data outside Vite.
  code=code.replace(/import\s+(\w+)\s+from\s+(['"])([^\n]+?\.(?:png|jpe?g|webp|avif|svg))\2\s*;/g,(_,name,q,asset)=>`const ${name}=${JSON.stringify(path.resolve(path.dirname(file),asset))};`);
  code=code.replace(/import\s+\{[^}]+\}\s+from\s+['"]\.\/(?:podSeoCatalog|portfolioMedia|commercialTerms(?:\.js)?)['"]\s*;/g,'');
  if(/^\s*import\s/m.test(code))throw Error('Unsupported import in '+relativeFile);
  code=code.replace(/\bexport\s+(?=const\s|function\s)/g,'');
  return vm.runInNewContext(code+'\n;({'+names.join(',')+'})',bindings,{filename:relativeFile,timeout:2000});
}
const portfolio=await evaluateData('src/data/portfolioMedia.js',['productPortfolioMedia']);
const {publishedProducts}=await evaluateData('src/data/products.js',['publishedProducts'],{...seo,...portfolio,...commercial});
const presets=[];
for(const observed of observations.products){
  const product=publishedProducts.find(p=>p.slug===observed.slug);
  if(!product)throw Error(observed.slug+' is not published in canonical data.');
  const base=product.pdpPricing.baseConfigurations[0].price;
  if(base!==observed.startingPrice)throw Error(`${product.name}: canonical price ${base} differs from reviewed website price ${observed.startingPrice}. Recheck the website before updating its observation.`);
  const file=product.catalogImage;
  const image=await fs.readFile(file);
  const {data,info}=await sharp(image).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  let top=info.height,bottom=-1;
  for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]>16){top=Math.min(top,y);bottom=Math.max(bottom,y);}
  if(info.width!==1600||info.height!==1200||bottom-top+1!==1000||bottom+1!==1100)throw Error(product.name+': catalogue image does not meet the existing canvas, height and baseline rules.');
  const dimension=seo.POD_SEO_BY_SLUG[product.slug].schemaProperties.find(p=>p.name==='External dimensions')?.value;
  const configurations=(product.pdpPricing.configurationOptions||[]).map(option=>({id:option.id,label:option.label,price:typeof option.amount==='number'?option.amount:null,quoteRequired:!!option.quoteRequired,includesSofa:/sofa/i.test(option.label)}));
  const addons=(product.pdpPricing.addOnOptions||[]).map(option=>({id:option.id,label:option.label,price:option.amount,exclusiveGroup:['high-bar-stool','two-high-bar-stools','office-chair','flex-sofa'].includes(option.id)?'seating':null,kind:/sofa/i.test(option.label)?'sofa':'other',...(option.image?{imageSource:path.relative(root,option.image)}:{})}));
  const rateObservation=observed.options;
  if(rateObservation){
    const actual={configurations:configurations.map(({id,price})=>({id,price})),addons:addons.map(({id,price})=>({id,price})),installation:product.pdpPricing.installationPerUnit,delivery:product.pdpPricing.delivery.default};
    const deliveryOverride=observations.commercialOverrides?.standardDelivery;
    if(deliveryOverride){if(actual.delivery!==deliveryOverride.amount||deliveryOverride.status!=='owner-confirmed')throw Error('Canonical delivery differs from the owner-confirmed correction.');actual.delivery=rateObservation.delivery;}
    if(JSON.stringify(actual)!==JSON.stringify(rateObservation))throw Error(product.name+': options or site charges differ from the reviewed website snapshot.');
  }
  presets.push({key:product.slug,label:product.name,price:base,basis:'Pod only',dimensions:dimension?'External size: '+dimension.replaceAll('×','x'):'',imageSource:path.relative(root,file),source:observed.source,checkedOn:observations.checkedOn,configurations,addons,installation:product.pdpPricing.installationPerUnit,delivery:product.pdpPricing.delivery.default,optionsStatus:rateObservation?'checked-against-website':'canonical-snapshot'});
}
await fs.writeFile(path.join(root,'tools/quotation-generator/catalogue.json'),JSON.stringify({source:{checkedOn:observations.checkedOn,url:observations.pricingPage,status:observations.status},products:presets},null,2)+'\n');
console.log(`Updated ${presets.length} catalogue presets. Their photos retain the approved canvas, visible height and baseline.`);
if(!process.argv.includes('--data-only'))await import('./build-quotation-generator.mjs');
