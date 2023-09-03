import { Schema, model, connect } from "mongoose";
import IAd from "../types/ad";
import IUser from "../types/user";
import moment from "moment";

const adSchema = new Schema<IAd>({
  id: { type: "number", required: true },
  date: Number,
  updated: Number,
  imageUrl: String,
  title: String,
  description: String,
  city: String,
  postalCode: String,
  contactName: String,
  email: String,
  phoneNumber: String,
});
const AdsModel = model<IAd>("Ads", adSchema);

const userSchema = new Schema<IUser>({
  chatId: { type: "number", required: true },
  lastUpdate: { type: "number", required: true, default: new Date().getTime() },
});
const UserModel = model<IUser>("User", userSchema);

export default new (class MongoDB {
  async getAfter(date?: number, limit?: number): Promise<IAd[]> {
    return await AdsModel.find({
      updated: { $gte: date },
    })
      .limit(limit)
      .lean();
  }

  async update(changes: IAd[]) {
    changes.forEach(async (change) => {
      await AdsModel.findOneAndUpdate({ id: change.id }, change, {
        upsert: true,
      });
    });
  }

  async updateUser(userId: number, newDate?: number) {
    if (!newDate) {
      const latestPost = await AdsModel.find({}, null, {
        sort: { updated: -1 },
      })
        .limit(1)
        .lean();
      console.log(latestPost.length);
    }
    await UserModel.findOneAndUpdate(
      { chatId: userId },
      { chatId: userId, lastUpdate: newDate },
      { upsert: true }
    );
  }

  async getAllUsers() {
    // returning all users sorted from oldest to newest update field
    return await UserModel.find({}, null, { sort: { lastUpdate: 1 } }).exec();
  }

  async connect() {
    await connect("mongodb://127.0.0.1:27017/torontovka");
  }
})();
