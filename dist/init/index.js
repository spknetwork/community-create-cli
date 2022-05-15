"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupPackages = void 0;
const child_process_1 = require("child_process");
const color_1 = require("../color");
const setupPackages = () => {
    (0, child_process_1.exec)('apt install git', (error, stdout) => {
        if (error) {
            console.log(error);
            console.log(color_1.Color.FgRed + 'Couldn\'t download git' + color_1.Color.Reset);
            return;
        }
        console.log(color_1.Color.FgBlue + stdout + color_1.Color.Reset);
    });
    (0, child_process_1.exec)('apt install docker', (error, stdout) => {
        if (error) {
            console.log(error);
            console.log(color_1.Color.FgRed + 'Couldn\'t download docker' + color_1.Color.Reset);
            return;
        }
        console.log(color_1.Color.FgBlue + stdout + color_1.Color.Reset);
    });
    (0, child_process_1.exec)('curl -SL https://github.com/docker/compose/releases/download/v2.5.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose && chmod +x /usr/local/bin/docker-compose', (error, stdout) => {
        if (error) {
            console.log(error);
            console.log(color_1.Color.FgRed + 'Couldn\'t download docker-compose' + color_1.Color.Reset);
            return;
        }
        console.log(color_1.Color.FgBlue + stdout + color_1.Color.Reset);
    });
};
exports.setupPackages = setupPackages;
