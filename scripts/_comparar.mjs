import sharp from 'sharp';
const [x,y,w,h] = process.argv.slice(2,6).map(Number); const out=process.argv[6];
const Z=2, BX=53-6, BY=266-6, BW=1339-53+12;
const orig = await sharp('design/logo/logo-doces-mantiqueira.png').extract({left:x,top:y,width:w,height:h}).resize(w*Z).flatten({background:'#FBF7E6'}).png().toBuffer();
const vimg = await sharp('src/assets/logo/logo.svg',{density:300}).resize(BW*Z).extract({left:(x-BX)*Z,top:(y-BY)*Z,width:w*Z,height:h*Z}).flatten({background:'#FBF7E6'}).png().toBuffer();
await sharp({create:{width:w*Z*2+10,height:h*Z,channels:3,background:'#888'}}).composite([{input:orig,left:0,top:0},{input:vimg,left:w*Z+10,top:0}]).png().toFile(out);
