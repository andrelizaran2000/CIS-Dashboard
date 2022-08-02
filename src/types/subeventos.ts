export type SubeventoBody = {
  name:string;
  description:string;
  initHour:string;
  initDate:string;
  endHour:string;
  flyer:string;
  type:string;
  eventId:string;
  eventLink:string;
  formLink:string;
  expositorId:string;
  expositoresIds:{ value:number, label:string }[];
}

export type SubeventoBodyWithId = SubeventoBody & { id:string };