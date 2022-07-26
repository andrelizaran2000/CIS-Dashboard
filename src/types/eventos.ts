export type EventoBody = {
  title:string;
  description:string;
  initDate:string;
  endDate:string;
  flyer:any;
}

export type EventoBodyWithId = EventoBody & { id:number };