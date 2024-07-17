import { Type } from 'class-transformer';
import { IsOptional, IsInt, IsDate, IsString } from 'class-validator';

export class FindAvaliacaoDto {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate: Date;

  @IsString()
  @IsOptional()
  cliente: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  skip: number = 0;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  take: number = 10;
}
