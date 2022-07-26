export type SubeventoBody = {
  title:string;
  description:string;
  initDate:string;
  endDate:string;
  flyer:string;
}

export type SubeventoBodyWithId = SubeventoBody & { id:number };