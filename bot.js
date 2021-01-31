

// Load up the discord.js library
const Discord = require("discord.js");
var schedule = require('node-schedule');
var fs = require('fs');
// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`cars | --help`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
  }
  if(command === "help") {
    message.channel.send("Here's what I can do (all commands must start with '--'): \n _bmw_    for a random BMW picture\n _v8_     for a random V8 muscle car picture \n _popup_     for a surprise \n _fnf_     for a Fast&Furious GIF\n _euro_    european market fanboi\n _import_    jdm fanboi\n ");
  }

  if(command === "v8") {
    var files = fs.readdirSync('./v8');
    let chosenFile = files[Math.floor(Math.random() * files.length)];
    message.channel.send({files:['./v8/'+chosenFile]});
  }

  if(command === "bmw") {
    var files = fs.readdirSync('./bmw');
    let chosenFile = files[Math.floor(Math.random() * files.length)];
    message.channel.send({files:['./bmw/'+chosenFile]});
  }

  if(command === "fnf") {
    var files = fs.readdirSync('./fnf');
    let chosenFile = files[Math.floor(Math.random() * files.length)];
    message.channel.send({files:['./fnf/'+chosenFile]});
  }

  if(command === "popup") {
    var files = fs.readdirSync('./popup');
    let chosenFile = files[Math.floor(Math.random() * files.length)];
    message.channel.send({files:['./popup/'+chosenFile]});
  }

  if(command === "euro") {
    var files = fs.readdirSync('./euro');
    let chosenFile = files[Math.floor(Math.random() * files.length)];
    message.channel.send({files:['./euro/'+chosenFile]});
  }

  if(command === "import") {
    var files = fs.readdirSync('./import');
    let chosenFile = files[Math.floor(Math.random() * files.length)];
    message.channel.send({files:['./import/'+chosenFile]});
  }

  var coffee = schedule.scheduleJob('0 9 * * *', function() {
    message.channel.send("This is your daily reminder to drink coffee! Seize the day!");
  });
  
  var rem1 = schedule.scheduleJob('0 12 * * *', function() {
    message.channel.send("@here This is a reminder to drink water! Have a good lunch!");
  });

  var rem2 = schedule.scheduleJob('0 15 * * *', function() {
    message.channel.send("@here This is a reminder to drink water! Have a good afternoon!");
  });

  var rem420 = schedule.scheduleJob('20 16 * * *', function() {
    message.channel.send("420");
  });

  var rem3 = schedule.scheduleJob('0 18 * * *', function() {
    message.channel.send("@here This is a reminder to drink water... or wine! :wine_glass: Have a good evening!");
  });
  
  var rem4 = schedule.scheduleJob('0 21 * * *', function() {
    message.channel.send("@here");
    message.channel.send({embed: {
      color: 3447003,
      title: "https://randomlists.com/drinks?dup=false&qty=1",
      url: "https://randomlists.com/drinks?dup=false&qty=1",
      description: "Daily random drink for everyone!"
    }});
  });

  var rem5 = schedule.scheduleJob('0 23 * * *', function() {
    message.channel.send("@here Everybody go to bed at a resonable time today! Goodnight, you puny humans. *scoffs* ");
  });

});



client.login(config.token);