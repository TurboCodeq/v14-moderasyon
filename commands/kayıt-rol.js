const discord = require('discord.js');
const db = require('croxydb')

exports.run = (client, message, args) => {
  
  if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`   **Bu komutu kullanabilmek için "\` Mesajları Yönet\`" yetkisine sahip olmalısın.**`);
  
let rol = message.mentions.roles.first()
if(!rol) return message.reply({content: " **HATA:** bir rol belirtmen gerekiyor.", allowedMentions: {repliedUser: false}})
  
  db.set(`kayitrol_${message.guild.id}`, rol.id)
  message.reply({content: ` **BAŞARILI:**
  
  • Kayıt Rolü **${rol.name}** olarak ayarlandı.`, allowedMentions: {repliedUser: false}})
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'kayıt-rol'
};