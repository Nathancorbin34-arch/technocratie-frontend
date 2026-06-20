const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dossier = './src/assets/images';
const fichiers = fs.readdirSync(dossier).filter(f => 
  (f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png')) && f !== 'Logo-technocratie.png'
);

async function convertir() {
  for (const fichier of fichiers) {
    const cheminEntree = path.join(dossier, fichier);
    const nomSansExtension = fichier.replace(/\.(jpg|jpeg|png)$/i, '');
    const cheminSortie = path.join(dossier, `${nomSansExtension}.webp`);

    if (fs.existsSync(cheminSortie)) continue;

    await sharp(cheminEntree)
      .resize(1200)
      .webp({ quality: 75 })
      .toFile(cheminSortie);

    const tailleAvant = fs.statSync(cheminEntree).size;
    const tailleApres = fs.statSync(cheminSortie).size;

    console.log(`✓ ${fichier} → ${nomSansExtension}.webp (${(tailleAvant/1024).toFixed(0)}Ko → ${(tailleApres/1024).toFixed(0)}Ko)`);
  }
  console.log('\n✅ Conversion terminée !');
}

convertir();