import { LAST_ACTIVE_TIME } from "../contants";
import { LastActiveTimeAction } from "../reducers/lastActiveTimeReducer";

export const lastActiveTimeAction = (): LastActiveTimeAction => ({
   type: LAST_ACTIVE_TIME,
   payload: Date.now()
})