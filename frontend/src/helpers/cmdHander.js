const helps = `
Basic commands: <br/>
cls   - Clears the console. <br/>
hello - Greets the user. <br/>
date  - Shows the current date and time.<br/>
?     - Displays this help message. <br/> <br/> 

webContainer Commands: <br/>

`;

export const BasicCommand = {
    // Basic commands:
    "hello": () => "Hello, Welcome to AI Agent. This is Only JavaScript CodeEditor. Thanks for Contributing",
    "date": () => new Date().toString(),
    "help": () => helps,
};

export const WebContainerCommand = {
    "ls": () => ["ls"],
    "npm i": () => ['npm', ['install']],
    "npm run start": () => ['npm', ['start']],
}