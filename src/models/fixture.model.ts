import { Schema } from 'mongoose';
import { MFixture } from './interfaces/model.interface';

const FixtureSchema = new Schema<MFixture>(
  {
    homeTeam: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    awayTeam: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    homeTeamName: { type: String, required: true },
    awayTeamName: { type: String, required: true },
    homeTeamScore: { type: Number, required: true, default: 0 },
    awayTeamScore: { type: Number, required: true, default: 0 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

FixtureSchema.pre<MFixture>('save', function (next) {
  this.endDate = new Date(this.startDate.getTime() + 90 * 60000);
  next();
});

export default FixtureSchema;
