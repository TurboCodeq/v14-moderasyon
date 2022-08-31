const discord = require('discord.js');
const db = require('croxydb')



exports.run = async (client, message, args) => {
  
  if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`   **Bu komutu kullanabilmek için "\`Mesajları Yönet\`" yetkisine sahip olmalısın.**`);
  
let kanal = message.mentions.channels.first()
if(!kanal) return message.reply({content: " **HATA:** bir kanal etiketlemen gerekiyor.", allowedMentions: {repliedUser: false}})
 
  
  db.set(`kayitlog_${message.guild.id}`, kanal.id)
message.reply({content: `
**BAŞARILI**:
• Kayıt log **${kanal.name}** olarak ayarlandı.
`, allowedMentions: {repliedUser: false}})
  
}
exports.conf = {
  aliases: []
};

exports.help = {
  name: "kayıt-log"
};
