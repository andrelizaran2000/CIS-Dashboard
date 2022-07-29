export type SubeventoBody = {
  name:string;
  description:string;
  initHour:string;
  initDate:string;
  endHour:string;
  endDate:string;
  flyer:string;
  register:boolean;
  type:number;
  limit:number;
  status:number;
  eventId:number;
}

export type SubeventoBodyWithId = SubeventoBody & { id:number };