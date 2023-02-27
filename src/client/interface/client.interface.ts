import { Document } from 'mongoose';

export interface IClient extends Document{
  readonly email: string;

  readonly CF: string;

  readonly name: string;
  readonly dataYear: number;

  readonly lastName: string;

  readonly birthdate: Date;

  readonly birthplace: string;

  readonly PIVA: number;

  readonly residenceSince: Date;

  readonly residenceAddress: string;

  readonly ZIP: number;

  readonly city: string;

  readonly province: string;

  readonly CF5x1000: number;

  readonly name5x1000: string;

  readonly C8x1000: string;

  readonly civilStatus: string;

  readonly partnerCF: string;

  readonly partnerSince: number;
}