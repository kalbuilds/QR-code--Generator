import inquirer from "inquirer"
import qr from "qr-image"
import fs from "fs";

inquirer
    .prompt([{
        message: "Type in your URL",
        name: "URL"
    }])
    .then((answers) => {
        const URL = answers.URL;
        var qr_svg = qr.image(URL);
        qr_svg.pipe(fs.createWriteStream('qr_image.png'));
    })
    .catch((error) => {
        if (error.isTtyError) {

        } else {

        }
    });