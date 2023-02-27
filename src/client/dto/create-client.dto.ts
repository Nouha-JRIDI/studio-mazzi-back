import {
  Contains,
  IsAlpha,
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { C8x1000Enum } from '../enum/Name5x1000.enum';
import { CivilStatusEnum } from '../enum/CivilStatus.enum';

export class CreateClientDto {
  @IsEmail()
  readonly email: string;
  @IsAlphanumeric()
  @Length(16, 16)
  readonly CF: string;

  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  readonly dataYear: number;
  @IsAlpha()
  readonly name: string;
  @IsAlpha()
  readonly lastName: string;

  readonly birthdate: Date;
  @IsAlpha()
  @Length(2, 2)
  readonly birthplace: string;
  @Length(11, 11)
  readonly PIVA: number;

  readonly residenceSince: Date;
  @Matches(/^[a-z0-9 ]+$/i)
  @Contains(' ')
  readonly residenceAddress: string;
  @Length(5, 5)
  readonly ZIP: number;
  @IsAlpha()
  readonly city: string;
  @IsAlpha()
  @Length(2, 2)
  readonly province: string;
  @Length(11, 11)
  @IsOptional()
  readonly CF5x1000: number;

  @Matches(/^[a-z0-9 ]+$/i)
  @IsOptional()
  readonly name5x1000: string;

  @IsEnum(C8x1000Enum)
  readonly C8x1000: C8x1000Enum;

  @IsEnum(CivilStatusEnum)
  readonly civilStatus: CivilStatusEnum;
  @IsAlphanumeric()
  @Length(16, 16)
  readonly partnerCF: string;
  @Min(0)
  @Max(12)
  @IsInt()
  readonly partnerSince: number;
}
