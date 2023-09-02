import { Schema, model, connect } from "mongoose";
import IAd from "../types/ad";

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

export default class MongoDB {
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

  async connect() {
    await connect("mongodb://127.0.0.1:27017/torontovka");
  }
}
