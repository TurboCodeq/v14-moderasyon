const { Client, GatewayIntentBits, Partials, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType } = require("discord.js");
const Discord = require("discord.js")
const config = require("./config.js");
let prefix = config.prefix
const db = require("croxydb")
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const client = global.client = new Discord.Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});


module.exports = client;

require("./events/message.js") 

require("./events/ready.js")

client.on("guildMemberAdd", member => {
  const kanal = db.get(`gckanal_${member.guild.id}`)
  if(!kanal) return;
  member.guild.channels.cache.get(kanal).send({content: `:inbox_tray: | ${member} sunucuya katıldı! Sunucumuz **${member.guild.memberCount}** kişi oldu.`})
})

client.on("guildMemberRemove", member => {
  const kanal = db.get(`gckanal_${member.guild.id}`)
  if(!kanal) return;
  member.guild.channels.cache.get(kanal).send({content: `:outbox_tray: | ${member} sunucudan ayrıldı! Sunucumuz **${member.guild.memberCount}** kişi oldu.`})
})

client.on("interactionCreate", async (interaction, message) => {
    const dc = require("discord.js")
    try {
    if(!interaction.isSelectMenu()) return
    
    if(interaction.customId === "yardım") {
      
      let message = await interaction.channel.messages.fetch(interaction.message.id)
      let value = interaction.values
      
      if(value[0] === "moderasyon") {
        await interaction.deferUpdate()
        
        const embed = new Discord.EmbedBuilder()
        .setTitle("Moderasyon Komutları!")
    .setDescription(`${prefix}ban\n${prefix}kick\n${prefix}oto-rol\n${prefix}temizle\n${prefix}hg-bb\n${prefix}başvur\n${prefix}başvuru-kanal\n${prefix}başvuru-log\n${prefix}başvuru-rol\n${prefix}kayıt-rol\n${prefix}kayıt\n${prefix}kayıt-log`) 
        .setTimestamp()
   
        
        await message.edit({embeds: [embed]})
        
      } else if(value[0] === "kullanıcı") { 
        await interaction.deferUpdate()
        
        const embed = new Discord.EmbedBuilder()
      .setTitle("Kullanıcı Komutlarım!")
    .setDescription(`${prefix}istatistik\n${prefix}ping\n${prefix}yardım\n${prefix}avatar\n${prefix}sunucu\n${prefix}snake\n${prefix}snipe`)
     
        .setTimestamp()
  
        await message.edit({embeds:[embed]})
        }
      
    }
    
    // if error
    } catch(e) {
     
    }
  })

client.on('messageDelete', message => {

  db.set(`snipe.mesaj.${message.guild.id}`, message.content)
  db.set(`snipe.id.${message.guild.id}`, message.author.id)

})


const modal = new ModalBuilder()
.setCustomId('form')
.setTitle('Godzilla - Başvuru Formu!')
  const a1 = new TextInputBuilder()
  .setCustomId('isim')
  .setLabel('İsminiz?')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('Arda')
  .setRequired(true)
	const a2 = new TextInputBuilder() 
	.setCustomId('yas')
	.setLabel('Yaşınız Kaçtır?')
  .setStyle(TextInputStyle.Paragraph)  
	.setMinLength(1)
	.setPlaceholder('15')
	.setRequired(true)
	const a3 = new TextInputBuilder() 
	.setCustomId('biz')
	.setLabel('Neden Biz?')
  .setStyle(TextInputStyle.Paragraph)  
	.setMinLength(1)
	.setPlaceholder('Neden Bizimle Çalışmak İstiyorsun?')
	.setRequired(true)
	const a4 = new TextInputBuilder() 
	.setCustomId('yetkili')
	.setLabel('Daha Önce Bir Sunucuda Yetkili Oldun Mu?')
	.setMinLength(1)
  .setStyle(TextInputStyle.Paragraph)  
	.setPlaceholder('Farklı bir sunucuda yetkili oldun mu?')
	const a5 = new TextInputBuilder() 
    .setCustomId('aciklama')
    .setLabel('Eklemek İstediğin?')
    .setMinLength(1)
    .setStyle(TextInputStyle.Paragraph) 
    .setPlaceholder('Ek olarak bir şey söylemek istiyorsan yazabilirsin.')
    const row = new ActionRowBuilder().addComponents(a1);
    const row2 = new ActionRowBuilder().addComponents(a2);
    const row3 = new ActionRowBuilder().addComponents(a3);
    const row4 = new ActionRowBuilder().addComponents(a4);
    const row5 = new ActionRowBuilder().addComponents(a5);
    modal.addComponents(row, row2, row3, row4, row5);
  
   
client.on('interactionCreate', async (interaction) => {

	if(interaction.customId === "başvuru"){
    await interaction.showModal(modal);
	}
})
 
    client.on('interactionCreate', async interaction => {
      if (interaction.type !== InteractionType.ModalSubmit) return;
      if (interaction.customId === 'form') {

  let kanal = db.fetch(`basvurulog_${interaction.guild.id}`)
let rol = db.fetch(`basvururol_${interaction.guild.id}`)


		const isim = interaction.fields.getTextInputValue('isim')
		const yas = interaction.fields.getTextInputValue('yas')
		const biz = interaction.fields.getTextInputValue('biz')
		const yetkili = interaction.fields.getTextInputValue('yetkili')
    const aciklama = interaction.fields.getTextInputValue('aciklama')
	
    const embed = new Discord.EmbedBuilder()
    .setTitle("Yeni Başvuru Geldi!")
    .setDescription(`Başvuran: **${interaction.user.tag}**\n\nİsim: **${isim}**\n\nYaş: **${yas}**\n\nNeden Biz? **${biz}**\n\nYetkili Olduğu Sunucular: **${yetkili}**\n\nAçıklama: **${aciklama}**         ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`)
    .setColor(0x0099FF)
    const row = new Discord.ActionRowBuilder()
    .addComponents(
    new ButtonBuilder()
    .setCustomId('evet')
    .setLabel('Evet')
    .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
    .setCustomId("hayir")
    .setLabel("Hayır")
    .setStyle(ButtonStyle.Danger))
  
    
    


    await interaction.reply({ content: 'Başvurun gönderildi.', ephemeral: true });
    client.channels.cache.get(kanal).send({embeds: [embed], components: [row]}).then(async m => {
      db.set(`basvuru_${m.id}`, interaction.user.id)
      })
    }
    })




client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

if (interaction.customId == "evet") {
  interaction.deferUpdate()
  const data = await db.get(`basvuru_${interaction.message.id}`)
  if(!data) return;
const uye = data;
  let log = db.fetch(`basvurukanal_${interaction.guild.id}`)
  let rol = db.fetch(`basvururol_${interaction.guild.id}`)
 
  client.channels.cache.get(log).send(`<@${uye}> Adlı Kullanıcının Başvurusu Kabul Edildi Rolleri Verildi.`)
interaction.guild.members.cache.get(uye).roles.add(rol)

}
})


client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

if (interaction.customId == "hayir") {
  interaction.deferUpdate()
  const data = await db.get(`basvuru_${interaction.message.id}`)
  if(!data) return;
const uye = data;
  let log = db.fetch(`basvurukanal_${interaction.guild.id}`)
  
 
  client.channels.cache.get(log).send(`<@${uye}> Adlı Kullanıcının Başvurusu Red Edildi.`)

}
})
  
client.on("guildMemberAdd", async(member) => {
  
 const rol = db.fetch(`otorol_${member.guild.iḋ}`).rol
 
 member.roles.add(rol)
  
  
});


    










    
    








client.login(config.token)


