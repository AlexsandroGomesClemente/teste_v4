import { Schema, model } from "mongoose";

interface ImportHistory {
  filename: string;
  date?: Date;
}

const ImportHistorySchema = new Schema<ImportHistory>({
  filename: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const ImportHistory = model<ImportHistory>(
  "ImportHistory",
  ImportHistorySchema
);

export default ImportHistory;
