const { Client } = require('discord.js-selfbot-v13');
const client = new Client();
const chalk = require('chalk').default;
const ascii = `
                             ███╗   ██╗ ██████╗ ██████╗ ███████╗     ██╗███████╗
                             ████╗  ██║██╔═══██╗██╔══██╗██╔════╝     ██║██╔════╝
                             ██╔██╗ ██║██║   ██║██║  ██║█████╗       ██║███████╗
                             ██║╚██╗██║██║   ██║██║  ██║██╔══╝  ██   ██║╚════██║
                             ██║ ╚████║╚██████╔╝██████╔╝███████╗╚█████╔╝███████║
                             ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝ ╚════╝ ╚══════╝
                                         made by github.com/JinxedUp
------------------------------------------------------------------------------------------------------------------------
`

const TOKEN = "TOEKNNNNNNNNNNNN"
const prefix = '$';

client.on('ready', () => {
    console.clear();
    process.stdout.write('\x1b]2;nodejs selfbot\x07');
    console.log(chalk.green(ascii));
    console.log(chalk.green(`                                            Logged in as ${client.user.tag}`));
});

const commands = {
    ping: (message) => {
        message.channel.send('Pong!');
    },
    userinfo: (message) => {
        message.channel.send(`Your username: ${client.user.tag}\nYour ID: ${client.user.id}`);
    },
    whois: (message) => {
        const user = message.mentions.users.first() || client.user;
        message.channel.send(`User info:
Username: ${user.tag}
ID: ${user.id}
Created At: ${user.createdAt.toDateString()}`);
    },
    gay: (message) => {
        const user = message.mentions.users.first();
        if (!user) {
            return message.channel.send('Please mention a user for this command!');
        }
        const percentage = Math.floor(Math.random() * 101);
        message.channel.send(`${user.tag} is ${percentage}% gay 🌈`);
    },
    pfp: (message) => {
        const user = message.mentions.users.first() || client.user;
        message.channel.send(`${user.tag}'s avatar: ${user.displayAvatarURL({ dynamic: true, size: 512 })}`);
    },
    help: (message) => {
        const commandList = Object.keys(commands).map(cmd => `${prefix}${cmd}`).join('\n');
        message.channel.send(`**Available commands:**\n***${commandList}***`);
    }
};

client.on('messageCreate', (message) => {
    if (message.author.id !== client.user.id) return; // only respond selfbot
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commands[commandName]) {
        commands[commandName](message, args);
    }
});

client.login(TOKEN);
