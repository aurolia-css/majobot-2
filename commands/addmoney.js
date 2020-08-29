const Discord = require("discord.js");
const db = require("quick.db");
const prefix = process.env.PREFIX;

module.exports = {
 name: "addmoney",
 aliases: [],
 description: "Give money to mentioned user",
 category: 'Economy',
 usage: "addmoney <user> <money>",
 run: async (client, message, args) => {
 try {
  if (message.member.hasPermission("MANAGE_MESSAGES")) {
   let user = message.mentions.members.first();
   if (!user) return message.channel.send({embed: {
    color: 16734039,
    description: "You must mention someone to add money!"
   }})
   if (isNaN(args[1])) return message.channel.send({embed: {
    color: 16734039,
    description: "You must enter the amount of money to add!"
   }})
   db.add(`money_${message.guild.id}_${user.id}`, args[1])
   let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)
   let moneyEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`:white_check_mark: Added \`${args[1]}\` coins\n\nNew Balance: \`${bal}\``);
    message.channel.send(moneyEmbed)
  } else {
   message.channel.send({embed: {
    color: 16734039,
    description: "You don't have premission add money!"
   }})
  }
} catch(err) {
 message.channel.send({embed: {
  color: 16734039,
  description: "Something went wrong... :cry:"
 }})
}
}
}