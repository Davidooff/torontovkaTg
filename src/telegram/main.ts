import TelegramBot from "node-telegram-bot-api";
import MongoDB from "../mongo/main.js";
import IAd from "../types/ad.js";
import IPersonAd from "../types/personAd.js";

const TOKEN = "6311069190:AAERmevFYRYKGM98Yt61PtYcQf7wT2LiJI4";

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, async (msg) => {
  await MongoDB.updateUser(msg.chat.id);
  bot.sendMessage(
    msg.chat.id,
    "Да, жди. Теперь бот готов и будет уведомлять вас о изминениях"
  );
});

export async function sendAd(chatId: number, message: IAd): Promise<void> {
  let caption = "";
  if (message.title) {
    caption += message.title + "\n\n";
  }
  if (message.description) {
    caption += message.description + "\n\n";
  }
  let personPosted: IPersonAd = {
    contactName: message.contactName,
    email: message.email,
    phoneNumber: message.phoneNumber,
  };
  caption += JSON.stringify(personPosted);

  if (message.imageUrl) {
    try {
      if (caption.length < 1024) {
        await bot.sendPhoto(chatId, message.imageUrl, { caption });
      } else {
        await bot.sendPhoto(chatId, message.imageUrl);
        await bot.sendMessage(chatId, caption);
        setTimeout(() => bot.sendMessage(chatId, caption), 2000);
      }
    } catch {
      await bot.sendMessage(chatId, caption);
    }
  } else {
    await bot.sendMessage(chatId, caption);
  }
  await setTimeout(() => {}, 100);
  return;
}
