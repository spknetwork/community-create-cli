import fs from 'fs';
import p from 'prompt-sync'
import { exec } from 'child_process';
import { Color } from "../color";

const prompt = p({ sigint: true });

const createNGINXConfig = () => {
  const cwd = process.platform === "darwin" ? '/opt/homebrew/etc/nginx' : '/etc/nginx'
  const domains = prompt(Color.FgWhite + 'Input domains you want to use <example.com,www.example.com>: ' + Color.Reset).split(',');
  if (!fs.existsSync(cwd)) {
    console.log(
      Color.FgRed +
        "Please install NGINX using sudo apt install nginx or checking out NGINX documentation: https://www.nginx.com/resources/wiki/start/topics/tutorials/install/" +
        Color.Reset
    );
    return;
  }
  
  if (!fs.existsSync(`${cwd}/conf.d`)) {
    fs.mkdirSync(`${cwd}/conf.d`);
  }

  fs.writeFileSync(
    `${cwd}/conf.d/${domains[0]}.conf`,
    `
    server { root /var/www/html; server_name ${domains.join(' ')};
      location / {
          proxy_pass http://localhost:9000;
      }
    }
  `);

  exec("sudo nginx -t && sudo nginx -s reload", {cwd}, (error, stdout) => {
      if (error) {
        console.log(error)
        console.log(Color.FgRed + 'Couldn\'t run nginx' + Color.Reset)
        return;
      }

    console.log(Color.FgBlue + stdout + Color.Reset)
  });
};

export const setupDomain = () => {
  createNGINXConfig();
};
