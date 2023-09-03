import { sendAd } from "./telegram/main.js";
import MongoDB from "./mongo/main.js";
import parse from "./parse/main.js";
import getAll from "./parse/urlsLogic/getAll.js";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendingDataCycle() {
  const allUsers = await MongoDB.getAllUsers();
  if (allUsers.length == 0) return;

  const dateStartFrom = allUsers[0].lastUpdate;
  const allNewData = await getAll(dateStartFrom);
  for (const user of allUsers) {
    console.log(user);
    const dataToUser = allNewData.filter((date) => {
      console.log(date.updated > user.lastUpdate);
      return date.updated > user.lastUpdate;
    });

    if (dataToUser.length > 0) {
      for (const el of dataToUser) {
        await sendAd(user.chatId, el);
        user.lastUpdate = dataToUser[dataToUser.length - 1].updated;
        await user.save();
        await delay(100);
      }
    }
  }
}

async function start() {
  try {
    await MongoDB.connect();
    await parse();
    await sendingDataCycle();
    setInterval(sendingDataCycle, 1000 * 60 * 5);
  } catch (err) {
    console.error(err);
    start();
  }
}

start();
