const { Client, GatewayIntentBits, InteractionType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
require('dotenv').config();

const istemci = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const mesajSayisi = parseInt(process.env.MESSAGE_COUNT) || 5;
const beklemeSuresi = parseInt(process.env.MESSAGE_DELAY_MS) || 1000;

istemci.on('ready', async () => {
  console.log(`Bot hazır: ${istemci.user.tag}`);

  const komutlar = [{
    name: 'message-button',
    description: 'Buton ile mesaj gönder',
    options: [{
      name: 'icerik',
      description: 'Gönderilecek mesaj',
      type: 3,
      required: true
    }]
  }];

  try {
    const yuklenen = await istemci.application.commands.set(komutlar);
    console.log('Komutlar yüklendi:', yuklenen.map(x => x.name).join(', '));
  } catch (hata) {
    console.error('Komut yüklenemedi:', hata);
  }
});

istemci.on('interactionCreate', async etkilesim => {
  try {
    if (etkilesim.type === InteractionType.ApplicationCommand && etkilesim.commandName === 'message-button') {
      const icerik = etkilesim.options.getString('icerik');

      const satir = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('gonder')
          .setLabel('Gönder')
          .setStyle(ButtonStyle.Primary)
      );

      await etkilesim.reply({
        content: `Hazır: ${icerik}`,
        components: [satir],
        ephemeral: true
      });

      return;
    }

    if (etkilesim.isButton() && etkilesim.customId === 'gonder') {
      const icerik = etkilesim.message.content.replace('Hazır: ', '');

      if (!icerik) {
        await etkilesim.reply({ content: 'İçerik bulunamadı.', ephemeral: true });
        return;
      }

      await etkilesim.deferReply({ ephemeral: false });

      for (let i = 0; i < mesajSayisi; i++) {
        await etkilesim.followUp({ content: icerik, ephemeral: false });
        await new Promise(r => setTimeout(r, beklemeSuresi));
      }

      await etkilesim.editReply({ content: `${mesajSayisi} mesaj gönderildi.` });
    }
  } catch (hata) {
    console.error('Hata:', hata);
    try {
      const secenek = { content: 'Bir hata oluştu.', ephemeral: true };
      if (etkilesim.deferred || etkilesim.replied) {
        await etkilesim.followUp(secenek);
      } else {
        await etkilesim.reply(secenek);
      }
    } catch (_) {}
  }
});

istemci.login(process.env.TOKEN);
