export type ExpositorBody = {
  fullName:string;
  description:string;
  title:string;
  visible:true;
  profilePhoto:string;
  coverPhoto:string;
}

export type ExpositorBodyWithId = ExpositorBody & { id:number };