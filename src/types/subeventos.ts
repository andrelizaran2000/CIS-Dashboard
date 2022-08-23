import { ExpositorBodyWithId } from "./expositor";

export type SubeventoBody = {
  name:string;
  description:string;
  initHour:string;
  initDate:string;
  endHour:string;
  endDate:string;
  flyer:string;
  type:string;
  platformLink:string;
  platformId:string;
  eventId:string;
  speakers:string[];
  hasRegistration:boolean;
}

export type SubeventoBodyToDb = {
  type: string;
  name: string;
  description: string;
  initDate: string;
  endDate: string;
  platforms: { id:string, link:string }[];
  flyer: string;
  speakers: string[];
  eventId:string;
  hasRegistration:boolean;
}

export type SubeventBodyFromDB = {
  name:string;
  description:string;
  initDate:string;
  endDate:string;
  flyer:string;
  type:string;
  platforms: { id:string, link:string }[];
  speakers:string[];
  event:string;
  hasRegistration:boolean;
}

export type SubEventBodyFromDBWithId = SubeventBodyFromDB & { id:string };

export type SubeventoBodyToDbWithId = SubeventoBodyToDb & { id:string };

export type SubeventoBodyWithId = SubeventoBody & { id:string };