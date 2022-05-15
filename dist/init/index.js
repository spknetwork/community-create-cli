"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupPackages = void 0;
const child_process_1 = require("child_process");
const color_1 = require("../color");
const setupPackages = async () => {
    await (0, child_process_1.exec)('sudo apt install git', (error, stdout) => {
        if (error) {
            console.log(error);
            console.log(color_1.Color.FgRed + 'Couldn\'t download git' + color_1.Color.Reset);
            return;
        }
        console.log(color_1.Color.FgBlue + stdout + color_1.Color.Reset);
    });
    await (0, child_process_1.exec)('sudo apt install docker', (error, stdout) => {
        if (error) {
            console.log(error);
            console.log(color_1.Color.FgRed + 'Couldn\'t download docker' + color_1.Color.Reset);
            return;
        }
        console.log(color_1.Color.FgBlue + stdout + color_1.Color.Reset);
    });
    await (0, child_process_1.exec)('curl -SL https://github.com/docker/compose/releases/download/v2.5.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose', (error, stdout) => {
        if (error) {
            console.log(error);
            console.log(color_1.Color.FgRed + 'Couldn\'t download docker-compose' + color_1.Color.Reset);
            return;
        }
        console.log(color_1.Color.FgBlue + stdout + color_1.Color.Reset);
    });
};
exports.setupPackages = setupPackages;
