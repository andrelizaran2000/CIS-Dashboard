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
  formEvent:string;
  formSubevent:string;
  eventId:string;
  speakers:string[];
}

export type SubeventoBodyToDb = {
  type: string;
  name: string;
  description: string;
  initDate: string;
  endDate: string;
  formEvent: string;
  formSubevent: string;
  flyer: string;
  speakers: string[];
  eventId:string;
}

export type SubeventBodyFromDB = {
  name:string;
  description:string;
  initDate:string;
  endDate:string;
  flyer:string;
  type:string;
  formEvent:string;
  formSubevent:string;
  speakers:string[];
  event:string;
  platforms:ExpositorBodyWithId[];
}

export type SubEventBodyFromDBWithId = SubeventBodyFromDB & { id:string };

export type SubeventoBodyToDbWithId = SubeventoBodyToDb & { id:string };

export type SubeventoBodyWithId = SubeventoBody & { id:string };