import {RawNews, RawNewsTicker} from "../models";

export interface RequestAllNewsResponse {
    News: RawNews[];
    NewsTicker: RawNewsTicker[];
}