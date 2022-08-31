const Discord = require("discord.js");
const { Snake } = require("discord-gamecord")
exports.run = async (client, message, args) => {

new Snake({
        message: message,
        embed: {
        title: 'Yılan oyunu',  
        OverTitle: "Oyun bitti.",
        },
        snake: { head: '🟢', body: '🟩', tail: '🟢' },
        emojis: {
          board: '⬛',
          food: '🍎',
          up: '⬆️',
          right: '➡️',
          down: '⬇️',
          left: '⬅️',
        },
        othersMessage: 'Butonları kullanmak için oyunu sen başlatmalısın.',
      }).startGame();
  },
exports.conf = {
  aliases: ['yılan']
};

exports.help = {
  name: "snake"
};