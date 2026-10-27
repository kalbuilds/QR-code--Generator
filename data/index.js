import inquirer from "inquirer"
import qr from "qr-image"

inquirer
    .prompt([{
        message: "Type in your URL",
        name: "URL"
    }])
    .then((answers) => {
        const URL = answers.URL;
    })
    .catch((error) => {
        if (error.isTtyError) {

        } else {

        }
    });