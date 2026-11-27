// Publish standalone static entry points from the editable, self-contained source.
const fs = require('node:fs');
const path = require('node:path');
const base = path.join(__dirname,'..');
const source = fs.readFileSync(path.join(base,'index.html'),'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(base,'manifest.webmanifest'),'utf8'));
function write(file,value){
  const target=path.join(base,file);
  if(process.argv.includes('--check')){
    if(fs.readFileSync(target,'utf8')!==value)throw Error('Regenerate '+file);
  }else{
    fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,value);
  }
}
const shell=source.replace(/<style>\n([\s\S]*?)<\/style>/,(_,css)=>{
  write('shared/practice.css',css);return '<link rel="stylesheet" href="../shared/practice.css">';
}).replace(/<script>\n([\s\S]*?)<\/script>/,(_,js)=>{
  write('shared/practice.js',js);return '<script src="../shared/practice.js"></script>';
});
for(const [app,label,description] of [
  ['guitar','Pocket Guitar','Riff writing, chord voicings, fretboard workouts and guitar repertoire.'],
  ['bass','Pocket Bass','Electric bass lessons, chord-tone ear training and bass song tabs.'],
  ['drums','Pocket Drums','Practice pad and drum kit lessons, rudiments and groove scores.']
]){
  write(app+'/index.html',shell.replace('<html lang="en">','<html lang="en" data-instrument="'+app+'">')
    .replace(/(<meta name="description" content=")[^"]+/, '$1'+description)
    .replaceAll('href="icon-', 'href="../icon-').replace('href="apple-touch-icon','href="../apple-touch-icon')
    .replace('<title>Pocket Rehearsal</title>','').replace('</head>','<title>'+label+'</title>\n</head>')
    .replace('class="bname">Pocket Rehearsal','class="bname">'+label));
  write(app+'/manifest.webmanifest',JSON.stringify({...manifest,id:'./',start_url:'./',scope:'./',name:label,short_name:label,description,icons:manifest.icons.map(icon=>({...icon,src:'../'+icon.src}))},null,2)+'\n');
}
