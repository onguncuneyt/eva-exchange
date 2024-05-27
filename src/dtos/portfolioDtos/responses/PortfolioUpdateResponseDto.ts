import { ShareEntity } from 'src/entities';

export class PortfolioUpdateResponseDto {
  constructor(id?: string, userId?: string, shares?: ShareEntity[]) {
    this.id = id;
    this.userId = userId;
    this.shares = shares;
  }
  id: string;
  userId: string;
  shares: ShareEntity[];
}
