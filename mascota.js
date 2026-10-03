const p=new URLSearchParams(location.search),id=p.get("id");
const loading=document.getElementById("loading"),content=document.getElementById("content"),errorBox=document.getElementById("error");
const newBox=document.getElementById("newBox");
function setText(x,v){document.getElementById(x).textContent=v||"No indicado";}
async function load(){
 if(!id){loading.hidden=true;errorBox.hidden=false;errorBox.textContent="No se indicó la mascota.";return;}
 try{
  const r=await fetch("/api/obtener-mascota?id="+encodeURIComponent(id)); const d=await r.json();
  if(!r.ok)throw new Error(d.error||"No se encontró la mascota."); const pet=d.pet;
  document.title=pet.name+" | CANQR"; setText("petName",pet.name);setText("petBasic",(pet.species||"Mascota")+(pet.breed?" · "+pet.breed:""));
  ["species","breed","age","color","owner","city"].forEach(k=>setText(k,pet[k]));
  const img=document.getElementById("petPhoto");
  if(d.hasPhoto)img.src="/api/foto-mascota?id="+encodeURIComponent(id);else img.remove();
  const clean=(pet.phone||"").replace(/[^\d+]/g,""), tel=clean.startsWith("+")?clean:clean.replace(/^0/,"+593");
  document.getElementById("callBtn").href="tel:"+tel;
  document.getElementById("whatsappBtn").href="https://wa.me/"+clean.replace(/\D/g,"")+"?text="+encodeURIComponent("Hola, creo que encontré a "+pet.name+".");
  const box=document.getElementById("qrcode");box.innerHTML="";
  new QRCode(box,{text:location.href.split("&nuevo=")[0],width:220,height:220,correctLevel:QRCode.CorrectLevel.H});
  document.getElementById("downloadQR").onclick=()=>{const c=box.querySelector("canvas");if(!c)return;const a=document.createElement("a");a.download="CANQR-"+pet.name.replace(/[^a-z0-9]/gi,"-")+".png";a.href=c.toDataURL("image/png");a.click();};
  loading.hidden=true;content.hidden=false;if(p.get("nuevo")==="1")newBox.hidden=false;
 }catch(e){loading.hidden=true;errorBox.hidden=false;errorBox.textContent=e.message;}
} load();