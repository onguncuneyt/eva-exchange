export class CreateShareResponseDto {
  constructor(name?: string, symbol?: string, amount?: number, rate?: number) {
    this.name = name;
    this.symbol = symbol;
    this.amount = amount;
    this.rate = rate;
  }
  name: string;

  symbol: string;

  amount: number;

  rate: number;
}
