"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupServer = void 0;
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const color_1 = require("../color");
const prompt = require("prompt-sync")({ sigint: true });
const getRepo = () => {
    console.log(color_1.Color.FgBlue + 'Pulling community-fork repository', color_1.Color.Reset);
    if (!fs_1.default.existsSync('community-fork')) {
        (0, child_process_1.exec)('git clone https://github.com/spknetwork/community-fork', (error, stdout) => {
            if (error) {
                console.log(error);
                console.log(color_1.Color.FgRed + 'Couldn\'t copy repository' + color_1.Color.Reset);
                return;
            }
            console.log(color_1.Color.FgBlue + stdout + color_1.Color.Reset);
        });
    }
    console.log(color_1.Color.FgGreen + 'Successfully pulled community-fork repo', color_1.Color.Reset);
};
const createEnv = () => {
    console.log(color_1.Color.FgBlue + 'Creating .env.local file', color_1.Color.Reset);
    let hive_id = process.argv[2] ? process.argv[2] : prompt(color_1.Color.FgWhite + "Community hive ID <hive-12345>: " + color_1.Color.Reset);
    let theme = process.argv[3] ? process.argv[3] : prompt(color_1.Color.FgWhite + "Theme <sky|burning|dusk>: " + color_1.Color.Reset);
    let tags = process.argv[4] ? process.argv[4] : prompt(color_1.Color.FgWhite + "Tags <3spk,spk,OTHERTAG>: " + color_1.Color.Reset);
    fs_1.default.writeFileSync('community-fork/.env.local', `HIVE_ID=${hive_id}\nTHEME=${theme}\nTAGS=${tags}`);
    console.log(color_1.Color.FgGreen + 'Successfully created .env.local file' + color_1.Color.Reset);
};
const runDockerCompose = () => {
    console.log(color_1.Color.FgBlue + 'Running project on port 9000', color_1.Color.Reset);
    (0, child_process_1.exec)('sudo docker-compose up -d', { cwd: 'community-fork' }, (error, stdOut) => {
        if (error) {
            console.log(error);
            console.log(color_1.Color.FgRed + 'Couldn\'t run project' + color_1.Color.Reset);
            return;
        }
        console.log(stdOut);
    });
    console.log(color_1.Color.FgGreen + "Successfully ran project" + color_1.Color.Reset);
};
const setupServer = () => {
    getRepo();
    console.log();
    createEnv();
    console.log();
    runDockerCompose();
};
exports.setupServer = setupServer;
