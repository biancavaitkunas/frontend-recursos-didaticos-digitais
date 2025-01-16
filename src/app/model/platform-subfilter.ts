import { Platform } from "./platform";
import { Subfilter } from "./subfilter";

export interface PlatformSubfilter {
    id: number;
    platform: Platform;
    subfilter: Subfilter;
}
