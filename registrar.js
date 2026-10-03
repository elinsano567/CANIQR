const form=document.getElementById("petForm");
const statusBox=document.getElementById("status");
const submitBtn=document.getElementById("submitBtn");
const photoInput=document.getElementById("photo");

form.addEventListener("submit",async e=>{
 e.preventDefault(); statusBox.textContent=""; statusBox.className="status";
 const photo=photoInput.files[0];
 if(photo && photo.size>2*1024*1024){statusBox.textContent="La foto supera los 2 MB.";statusBox.classList.add("error");return;}
 if(photo && !["image/jpeg","image/png","image/webp"].includes(photo.type)){statusBox.textContent="Formato de foto no permitido.";statusBox.classList.add("error");return;}
 submitBtn.disabled=true; submitBtn.textContent="Creando página...";
 try{
  const r=await fetch("/.netlify/functions/crear-mascota", {method:"POST",body:new FormData(form)});
  const data=await r.json(); if(!r.ok) throw new Error(data.error||"No se pudo crear la página.");
  location.href="/mascota.html?id="+encodeURIComponent(data.id)+"&nuevo=1";
 }catch(err){statusBox.textContent=err.message;statusBox.classList.add("error");submitBtn.disabled=false;submitBtn.textContent="Crear página de mi mascota";}
});
