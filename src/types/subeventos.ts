export type SubeventoBody = {
  name:string;
  description:string;
  initHour:string;
  initDate:string;
  endHour:string;
  flyer:string;
  register:boolean;
  type:number;
  limit:number;
  status:number;
  eventId:number;
  eventLink:string;
  formLink:string;
}

export type SubeventoBodyWithId = SubeventoBody & { id:number };