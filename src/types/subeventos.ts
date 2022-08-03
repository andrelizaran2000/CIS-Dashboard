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

export type CleanSubEventBody = {
  name:string;
  description:string;
  initDate:string;
  endDate:string;
  flyer:string;
  type:string;
  formEvent:string;
  formSubevent:string;
  speakers:string[];
}

export type CleanSubEventBodyFromDB = {
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
}

export type CleanSubEventBodyFromDBWithId = CleanSubEventBodyFromDB & { id:string };

export type SubeventoBodyWithId = SubeventoBody & { id:string };