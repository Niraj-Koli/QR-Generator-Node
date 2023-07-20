import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
    .prompt([
        {
            type: "input",
            message: "Type Site URL: ",
            name: "URL",
        },
    ])
    .then((answers) => {
        const url = answers.URL;
        let qr_png = qr.image(url);
        qr_png.pipe(fs.createWriteStream("qr.png"));

        fs.writeFile("url.txt", url, (err) => {
            if (err) {
                throw err;
            }
            console.log("QR Code Generated!");
        });
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("Error");
        } else {
            console.log("Something Else Went Wrong");
        }
    });
