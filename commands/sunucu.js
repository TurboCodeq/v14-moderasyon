const {EmbedBuilder} = require("discord.js")
const request = require('request');
exports.run = async (client, message, args) => {
let sunucu = args[0]
if (!sunucu) return message.channel.send("Lütfen bir **mcpe** sunucu ip gir!")
 
request(`https://api.mcsrvstat.us/bedrock/2/${sunucu}`, function (error, response, body) {
  const json_body = JSON.parse(body);
  const onlinePlayers = json_body.players.online
  
       const embed = new EmbedBuilder()
       .setTitle("Godzilla - Mcpe Stat")
       .setDescription(`${sunucu} Sunucusunda ${onlinePlayers} Aktif!`)
     
  message.channel.send({embeds: [embed]});
  

})

}



exports.conf = {
  aliases: []
}

exports.help = {
  name: "sunucu"
}