"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDomain = void 0;
const fs_1 = __importDefault(require("fs"));
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const fs_admin_1 = require("fs-admin");
const child_process_1 = require("child_process");
const color_1 = require("../color");
const prompt = (0, prompt_sync_1.default)({ sigint: true });
const createNGINXConfig = () => {
    const cwd = process.platform === "darwin" ? '/opt/homebrew/etc/nginx' : '/etc/nginx';
    const domains = prompt(color_1.Color.FgWhite + 'Input domains you want to use <example.com,www.example.com>: ' + color_1.Color.Reset).split(',');
    if (!fs_1.default.existsSync(cwd)) {
        console.log(color_1.Color.FgRed +
            "Please install NGINX using sudo apt install nginx or checking out NGINX documentation: https://www.nginx.com/resources/wiki/start/topics/tutorials/install/" +
            color_1.Color.Reset);
        return;
    }
    if (!fs_1.default.existsSync(`${cwd}/conf.d`)) {
        (0, fs_admin_1.createWriteStream)(`${cwd}/conf.d`);
    }
    fs_1.default.writeFileSync(`${cwd}/conf.d/${domains[0]}.conf`, `
    server { root /var/www/html; server_name ${domains.join(' ')};\n
      location / {\n
          proxy_pass http://localhost:9000;\n
      }\n
    }
  `);
    (0, child_process_1.exec)("sudo nginx -t && sudo nginx -s reload", { cwd }, (error, stdout) => {
        if (error) {
            console.log(error);
            console.log(color_1.Color.FgRed + 'Couldn\'t run nginx' + color_1.Color.Reset);
            return;
        }
        console.log(color_1.Color.FgBlue + stdout + color_1.Color.Reset);
    });
    (0, child_process_1.exec)(`sudo certbot --nginx ${domains.map(domain => `-d ${domain} `)}`, { cwd }, (error, stdout) => {
        if (error) {
            console.log(error);
            console.log(color_1.Color.FgRed + 'Couldn\'t run certbot' + color_1.Color.Reset);
            return;
        }
        console.log(color_1.Color.FgBlue + stdout + color_1.Color.Reset);
    });
};
const setupDomain = () => {
    createNGINXConfig();
};
exports.setupDomain = setupDomain;
