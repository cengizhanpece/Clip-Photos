const fs = require('fs').promises;
const path = require("path")
const {loadImage, createCanvas} = require("canvas");

// Inital images location
let getImagesFrom = 'C:\\Users\\cengizhanp\\Pictures\\Screenshots';
// Location to save images
let saveImageTo = 'C:\\Users\\cengizhanp\\Desktop\\GGSoft';

const width = 1920;
const height = 1080;
const canvas = createCanvas(width,height);
const context = canvas.getContext('2d');
/* 
    Only supported file extensions will be pulled from the directory. Other file types will be ignored
*/
const supportedFileTypes = [".png", ".bmp", ".jpeg", ".svg", ".tiff", ".gif"]
async function getImages(getImagesFrom){

    let files =  await fs.readdir(getImagesFrom);
    // Filtering file types
    let imageFiles = files.filter((file)=>{
        return supportedFileTypes.includes(path.extname(file));
    })

    /* 
        Windows will be automaticly saves screenshots named as Ekran Görüntüsü (number)
        loadImage function inside the canvas library has some issues accessing files named with some unicode characters,
        So this loops through the files that has these characters and replace them.
    */
    imageFiles.forEach(async image=>{
        let unicodeChars = {
            'ö': 'o',
            'ü':'u',
            ' ':'',
            '(':'',
            ')':''
        }
            
        let newImageName = image.replace(/[öü ()]/g, m => unicodeChars[m])
        await fs.rename(getImagesFrom + '\\' + image, getImagesFrom + '\\' + newImageName)
    })

    //Files readed again with new file names
    // TODO: This can easily optimised so we dont read all the files again.
    files =  await fs.readdir(getImagesFrom);
    //Filtering file types again
    //TODO: This can also easily optimized  
    imageFiles = files.filter((file)=>{
        return supportedFileTypes.includes(path.extname(file));
    })
    return imageFiles;
}



/*
    This function will get images first,
    then creates a canvas to draw that image, but only giving width and height will be drawed so image will be cropped.
    then writes that file as png image, this can alsa be changed to image/jpg
*/
async function  cropImages (imageLocation){
    
    let imageFiles = await getImages(imageLocation);
    imageFiles.forEach(async file=>{
       
        let image = await loadImage(imageLocation+"\\"+file)
        context.drawImage(image,0,0,width,height, 0, 0, width,height);
        let imageBuffer= canvas.toBuffer('image/png')
        await fs.writeFile(saveImageTo + '\\' + file, imageBuffer);
        console.log(image);
    })
}


if (process.argv.includes("--rename")){
    //calling this function only to rename the files.
    getImages(getImagesFrom);
    console.log("renamed");
}
else
{
    //Crops images and starts the script
    cropImages(getImagesFrom);
    console.log("cropped");
}


