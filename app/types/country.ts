export interface Country {
  cca3: string;
  name: {
    common: string;
    official?: string;
  };
  flags: {
    png?: string;
    svg?: string;
    alt?: string;
  };
  region?: string;
  population?: number;
  capital?: string[];
}