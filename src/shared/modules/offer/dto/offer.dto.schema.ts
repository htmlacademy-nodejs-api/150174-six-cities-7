import Joi from 'joi';
import { CreateOfferDto } from './create-offer.dto.js';
import { City, Feature, Housing } from '../../../models/offer.interface.js';
import {
  DescriptionLength,
  Guests,
  Latitude,
  Longitude,
  NameLength,
  OFFER_IMAGES_AMOUNT,
  Price,
  Rooms,
} from '../../../constants/offer.js';

const offerDtoSchemaObject: Joi.ObjectPropertiesSchema<
  InstanceType<typeof CreateOfferDto>
> = {
  name: Joi.string()
    .required()
    .ruleset.min(NameLength.MIN)
    .max(NameLength.MAX)
    .rule({
      message: `Name length must be between ${NameLength.MIN} and ${NameLength.MAX} characters`,
    }),
  description: Joi.string()
    .required()
    .ruleset.min(DescriptionLength.MIN)
    .max(DescriptionLength.MAX)
    .rule({
      message: `Description length must be between ${DescriptionLength.MIN} and ${DescriptionLength.MAX}`,
    }),
  city: Joi.string()
    .required()
    .valid(...Object.values(City)),
  housing: Joi.string()
    .required()
    .valid(...Object.values(Housing)),
  features: Joi.array()
    .required()
    .items(...Object.values(Feature)),
  price: Joi.number()
    .required()
    .ruleset.min(Price.MIN)
    .max(Price.MAX)
    .rule({ message: `Price must be between ${Price.MIN} and ${Price.MAX}` }),
  rooms: Joi.number()
    .required()
    .ruleset.min(Rooms.MIN)
    .max(Rooms.MAX)
    .rule({
      message: `Rooms is required and must be between ${Rooms.MIN} and ${Rooms.MAX}`,
    }),
  guests: Joi.number()
    .required()
    .ruleset.min(Guests.MIN)
    .max(Guests.MAX)
    .rule({
      message: `Guests is required and must be between ${Guests.MIN} and ${Guests.MAX}`,
    }),
  previewUrl: Joi.string()
    .required()
    .uri()
    .message('Preview URL must be valid URL'),
  images: Joi.array()
    .required()
    .items(Joi.string().uri())
    .length(OFFER_IMAGES_AMOUNT)
    .message(`Offer images amount must be ${OFFER_IMAGES_AMOUNT}`),
  premium: Joi.boolean(),
  coordinates: Joi.object({
    lat: Joi.number()
      .required()
      .ruleset.min(Latitude.MIN)
      .max(Latitude.MAX)
      .message('Latitude must be a valid number'),
    lng: Joi.number()
      .required()
      .ruleset.min(Longitude.MIN)
      .max(Longitude.MAX)
      .message('Longitude must be a valid number'),
  }),
  userId: Joi.string().required(),
};

export { offerDtoSchemaObject };
