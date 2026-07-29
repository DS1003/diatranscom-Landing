const { Jimp } = require("jimp");
const fs = require("fs");
const path = require("path");

async function main() {
  try {
    console.log("Loading public/logo.png...");
    const img = await Jimp.read("public/logo.png");

    const width = img.bitmap.width;
    const height = img.bitmap.height;
    console.log(`Original size: ${width}x${height}`);

    const cropSize = height;
    console.log(`Cropping square region of size ${cropSize}x${cropSize} from x=0, y=0...`);
    
    // Crop using the object syntax for newer Jimp
    img.crop({ x: 0, y: 0, w: cropSize, h: cropSize });

    // Resize using object syntax for newer Jimp
    console.log("Resizing to 32x32 for favicon...");
    img.resize({ w: 32, h: 32 });

    console.log("Writing to public/favicon.png...");
    await img.write("public/favicon.png");
    console.log("favicon.png written successfully!");

    // Copy favicon.png to favicon.ico (browsers handle PNG bytes under .ico extension perfectly)
    console.log("Copying favicon.png to public/favicon.ico...");
    fs.copyFileSync("public/favicon.png", "public/favicon.ico");
    console.log("favicon.ico updated successfully!");

    // Reload and generate logo192 and logo512
    console.log("Reloading logo for logo192...");
    const img192 = await Jimp.read("public/logo.png");
    img192.crop({ x: 0, y: 0, w: cropSize, h: cropSize });
    img192.resize({ w: 192, h: 192 });
    await img192.write("public/logo192.png");
    console.log("logo192.png written successfully!");

    console.log("Reloading logo for logo512...");
    const img512 = await Jimp.read("public/logo.png");
    img512.crop({ x: 0, y: 0, w: cropSize, h: cropSize });
    img512.resize({ w: 512, h: 512 });
    await img512.write("public/logo512.png");
    console.log("logo512.png written successfully!");

  } catch (error) {
    console.error("Error cropping image:", error);
  }
}

main();
