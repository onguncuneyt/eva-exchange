import { IsString, IsNotEmpty } from 'class-validator';

export class AddShareToPortfolioDto {
  @IsString()
  @IsNotEmpty()
  shareId: string;
}
