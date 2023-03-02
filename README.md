# Clip Photos Inside The Given Folder
This script clips the photos inside the folder with specified width and height values

## Installation
Node.js must be installed in order to use this script.

After node.js installation done, download or clone the repo from github
Open a command line inside the project folder
Use
```bash
npm install
```
After installation finished
Open index.js file
Then change the getImagesFrom and saveImageTo variables to your desired destination like "C://FolderName//Folder"
node-canvas dependency has issues with reading files that contains special characters

For prevent thi issue first rename the files by using
```bash
node index.js --rename
```
Then run script to crop images
```bash
node index.js
```
