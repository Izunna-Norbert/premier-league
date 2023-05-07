import { Schema } from 'mongoose';
import { MTeam } from './interfaces/model.interface';

const TeamSchema = new Schema<MTeam>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export default TeamSchema;
