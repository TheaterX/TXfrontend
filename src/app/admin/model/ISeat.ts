export interface ISeat{
    row: number;
    number: number;
    exists: boolean;
    selected: boolean;
    taken?: boolean;
    username?: string;
    yours?: boolean;
  }