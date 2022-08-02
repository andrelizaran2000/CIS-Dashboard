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
  expositorId:string;
  eventId:string;
  expositoresIds:{ value:string, label:string }[];
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

export type SubeventoBodyWithId = SubeventoBody & { id:string };