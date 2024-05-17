import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
  // Ref,
} from '@typegoose/typegoose';

import { City, Offer } from '../../../models/index.js';
import { UserEntity } from '../user/user.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, type: String, trim: true })
  public description!: Offer['description'];

  @prop({ required: true, type: () => String, enum: City })
  public city!: Offer['city'];

  @prop({ required: true, type: String, trim: true })
  public name!: Offer['name'];

  @prop({ required: true, type: String, trim: true })
  public previewUrl!: Offer['previewUrl'];

  @prop({ required: true, default: [] })
  public images!: Offer['images'];

  @prop({ required: true, default: 0 })
  public rating!: Offer['rating'];

  @prop({ required: true })
  public rooms!: Offer['rooms'];

  @prop({ required: true })
  public coordinates!: Offer['coordinates'];

  @prop({ required: true })
  public price!: Offer['price'];

  @prop({ default: false })
  public premium!: Offer['premium'];

  @prop({ default: false })
  public favorite!: Offer['favorite'];

  @prop({ required: true })
  public features!: Offer['features'];

  @prop({ required: true })
  public housing!: Offer['housing'];

  @prop({ required: true })
  public guests!: Offer['guests'];

  @prop({
    ref: UserEntity,
    required: true,
    _id: true,
  })
  public userId!: string;

  @prop({ required: true, default: new Date() })
  public createdDate!: Offer['createdDate'];

  @prop({ required: false, default: 0 })
  public commentsAmount: Offer['commentsAmount'];

  constructor(offerData: CreateOfferDto) {
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
    this.userId = offerData.userId;
    this.createdDate = offerData.createdDate;
    this.commentsAmount = offerData.commentsAmount;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
