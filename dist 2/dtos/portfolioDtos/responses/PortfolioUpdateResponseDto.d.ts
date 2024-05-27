import { ShareEntity } from 'src/entities';
export declare class PortfolioUpdateResponseDto {
    constructor(id?: string, userId?: string, shares?: ShareEntity[]);
    id: string;
    userId: string;
    shares: ShareEntity[];
}
