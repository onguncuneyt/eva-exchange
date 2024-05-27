import { ShareEntity } from 'src/entities';
export declare class PortfolioCreateResponseDto {
    constructor(id?: string, userId?: string, shares?: ShareEntity[]);
    id: string;
    userId: string;
    shares: ShareEntity[];
}
