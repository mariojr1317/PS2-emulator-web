const input=document.getElementById("gameFile");
const zone=document.getElementById("dropZone");
const selected=document.getElementById("selectedGame");
const name=document.getElementById("fileName");
const size=document.getElementById("fileSize");
function showFile(file){
  if(!file)return;
  name.textContent=file.name;
  size.textContent=(file.size/1024/1024).toFixed(2)+" MB · seleccionado localmente";
  selected.hidden=false;
  zone.hidden=true;
}
function clearFile(){
  input.value="";
  selected.hidden=true;
  zone.hidden=false;
}
input.addEventListener("change",()=>showFile(input.files[0]));
document.getElementById("removeFile").addEventListener("click",clearFile);
["dragenter","dragover"].forEach(type=>zone.addEventListener(type,event=>{
  event.preventDefault();zone.classList.add("dragging");
}));
["dragleave","drop"].forEach(type=>zone.addEventListener(type,event=>{
  event.preventDefault();zone.classList.remove("dragging");
}));
zone.addEventListener("drop",event=>{
  const file=event.dataTransfer.files[0];
  if(file)showFile(file);
});

// Preferencias de rendimiento: perfil Bajo por defecto para Chromebooks.
// Se guardan localmente; el núcleo PS2 aún debe conectarse a estos valores.
const presetButtons=[...document.querySelectorAll("[data-preset]")];
const resolution=document.getElementById("resolutionScale");
const renderer=document.getElementById("renderer");
const effects=document.getElementById("effects");
const vsync=document.getElementById("vsync");
const settingsStatus=document.getElementById("settingsStatus");
const defaults={
  low:{resolution:"0.75",renderer:"auto",effects:false,vsync:true},
  balanced:{resolution:"1",renderer:"auto",effects:true,vsync:true},
  high:{resolution:"1.5",renderer:"webgpu",effects:true,vsync:true}
};
let currentPreset="low";
function saveSettings(){
  const settings={preset:currentPreset,resolution:resolution.value,renderer:renderer.value,effects:effects.checked,vsync:vsync.checked};
  try{localStorage.setItem("ps2evolution-settings",JSON.stringify(settings));}catch(error){}
  settingsStatus.textContent="Configuración guardada en este navegador · Perfil "+({low:"Bajo",balanced:"Equilibrado",high:"Alto"}[currentPreset])+".";
}
function applyPreset(preset){
  currentPreset=preset;
  const values=defaults[preset];
  resolution.value=values.resolution;
  renderer.value=values.renderer;
  effects.checked=values.effects;
  vsync.checked=values.vsync;
  presetButtons.forEach(button=>{
    const active=button.dataset.preset===preset;
    button.classList.toggle("active",active);
    button.setAttribute("aria-pressed",String(active));
  });
  saveSettings();
}
presetButtons.forEach(button=>button.addEventListener("click",()=>applyPreset(button.dataset.preset)));
[resolution,renderer,effects,vsync].forEach(control=>control.addEventListener("change",()=>{
  currentPreset="custom";
  presetButtons.forEach(button=>{button.classList.remove("active");button.setAttribute("aria-pressed","false");});
  settingsStatus.textContent="Configuración personalizada guardada en este navegador.";
  saveSettings();
}));
try{
  const saved=JSON.parse(localStorage.getItem("ps2evolution-settings")||"null");
  if(saved && saved.preset && defaults[saved.preset]){
    applyPreset(saved.preset);
    if(saved.resolution)resolution.value=saved.resolution;
    if(saved.renderer)renderer.value=saved.renderer;
    if(typeof saved.effects==="boolean")effects.checked=saved.effects;
    if(typeof saved.vsync==="boolean")vsync.checked=saved.vsync;
    saveSettings();
  }else{applyPreset("low");}
}catch(error){applyPreset("low");}
