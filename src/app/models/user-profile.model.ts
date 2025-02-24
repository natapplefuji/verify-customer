export class UserProfile {
    userName:string;
    imageUrl:string;
  
    constructor(profile?: any) {
      this.userName = profile?.userName ?? "";
      this.imageUrl = profile?.imageUrl;
    }
}