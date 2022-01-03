import { LAST_ACTIVE_TIME } from "../contants"

export interface LastActiveTimeAction {
   readonly type: typeof LAST_ACTIVE_TIME,
   readonly payload?: number
}

const lastActiveTimeReducer = (lastActiveTime: number = 0, action: LastActiveTimeAction) => {
   if (action.type === LAST_ACTIVE_TIME) return action.payload
   return lastActiveTime
}

export default lastActiveTimeReducer