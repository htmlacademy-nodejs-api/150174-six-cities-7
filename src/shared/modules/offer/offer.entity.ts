import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
} from '@typegoose/typegoose';

import { City, Offer } from '../../../models/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps implements Offer {
  @prop({ required: true, default: '' })
  public description: Offer['description'];

  @prop({ required: true, type: City, default: '' })
  public city: Offer['city'];

  @prop({ required: true, default: '' })
  public name: Offer['name'];

  @prop({ required: true, default: '' })
  public previewUrl: Offer['previewUrl'];

  @prop({ required: true, default: [] })
  public images: Offer['images'];

  @prop({ required: true, default: 0 })
  public rating: Offer['rating'];

  @prop({ required: true })
  public rooms: Offer['rooms'];

  @prop({ required: true })
  public coordinates: Offer['coordinates'];

  @prop({ required: true })
  public price: Offer['price'];

  @prop({ required: true })
  public premium: Offer['premium'];

  @prop({ required: true })
  public favorite: Offer['favorite'];

  @prop({ required: true })
  public features: Offer['features'];

  @prop({ required: true })
  public housing: Offer['housing'];

  @prop({ required: true })
  public guests: Offer['guests'];

  @prop({ required: true })
  public author: Offer['author'];

  @prop({ required: true, default: new Date() })
  public createdDate: Offer['createdDate'];

  @prop({ required: false, default: 0 })
  public commentsAmount: Offer['commentsAmount'];

  constructor(offerData: Offer) {
    super();

    this.name = offerData.name;
    this.description = offerData.description;
    this.city = offerData.city;
    this.previewUrl = offerData.previewUrl;
    this.images = offerData.images;
    this.rating = offerData.rating;
    this.rooms = offerData.rooms;
    this.coordinates = offerData.coordinates;
    this.price = offerData.price;
    this.premium = offerData.premium;
    this.favorite = offerData.favorite;
    this.features = offerData.features;
    this.housing = offerData.housing;
    this.guests = offerData.guests;
    this.author = offerData.author;
    this.createdDate = offerData.createdDate;
    this.commentsAmount = offerData.commentsAmount;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
