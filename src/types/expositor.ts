export type ExpositorBody = {
  firstName:string;
  lastName:string;
  description:string;
  title:string;
  visible:true;
  profilePhoto:string;
  coverPhoto:string;
}

export type ExpositorBodyWithId = ExpositorBody & { id:number };