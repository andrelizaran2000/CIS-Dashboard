export type EventoBody = {
  title:string;
  description:string;
  initDate:string;
  endDate:string;
  flyer:any;
  register:boolean;
}

export type EventoBodyWithId = EventoBody & { id:number };