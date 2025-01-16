import { AppUser } from "./app-user";
import { StatusPlatform } from "./status-platform";

export interface Platform {
    id: number;
    namePlatform: string;
    descriptionPlatform: string;
    urlVideo: string;
    urlPlatform: string;
    textTutorial: string;
    //logo: ArrayBuffer;
    //appUser: AppUser;
    //status: StatusPlatform;
}
