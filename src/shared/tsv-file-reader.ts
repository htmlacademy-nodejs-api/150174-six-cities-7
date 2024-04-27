import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import {
  City,
  Feature,
  Housing,
  Offer,
  User,
  UserType,
} from '../models/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      name,
      description,
      date,
      city,
      previewUrl,
      images,
      premium,
      favorite,
      rating,
      housing,
      rooms,
      guests,
      price,
      features,
      authorName,
      authorEmail,
      avatarUrl,
      password,
      userType,
      latitude,
      longitude,
      commentsAmount,
    ] = line.split('\t');

    return {
      name,
      description,
      date,
      city: city as City,
      previewUrl,
      images: this.parseStringArray<string>(images),
      premium: this.parseBoolean(premium),
      favorite: this.parseBoolean(favorite),
      rating: this.parseFloat(rating),
      housing: housing as Housing,
      rooms: this.parseInteger(rooms),
      guests: this.parseInteger(guests),
      price: this.parseInteger(price),
      features: this.parseStringArray<Feature>(features),
      author: this.parseUser(
        authorName,
        authorEmail,
        avatarUrl,
        password,
        userType as UserType
      ),
      commentsAmount:
        Number(commentsAmount) && this.parseInteger(commentsAmount),
      coordinates: {
        lat: this.parseFloat(latitude),
        lng: this.parseFloat(longitude),
      },
    };
  }

  private parseStringArray<T>(string: string): T[] {
    return string.split(';') as T[];
  }

  private parseInteger(string: string): number {
    return Number.parseInt(string, 10);
  }

  private parseFloat(string: string): number {
    return Number.parseFloat(string);
  }

  private parseBoolean(string: string): boolean {
    return string === 'true';
  }

  private parseUser(
    name: User['name'],
    email: User['email'],
    avatarUrl: User['avatarUrl'],
    password: User['password'],
    type: User['type']
  ): User {
    return { name, email, avatarUrl, password, type };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
