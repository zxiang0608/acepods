let quotationDocument;
function render(){clearTimeout(renderTimer);try{
  quotationDocument=createQuotationDocument({state,assets:ASSETS,helpers:{num,cents,formatted,calculate,quoteRows}});
  pages=quotationDocument.render();
  $('pages').replaceChildren(...pages.map(page=>{const el=document.createElement('div');el.className='paper';el.append(page.svg);return el;}));
  $('pageCount').textContent=`${pages.length} page${pages.length===1?'':'s'}`;layoutError='';
}catch(error){layoutError=error.message;$('message').textContent=layoutError;}return !layoutError;}
const svgToJpeg=svg=>quotationDocument.svgToJpeg(svg);
const makePdf=images=>quotationDocument.makePdf(images);
