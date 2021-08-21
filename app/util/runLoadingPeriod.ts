import createLoadingAction from "../redux/actions/loadingAction"
import { store } from "../redux/store/store"

export default function* runLoadingPeriod() {
   const dispatch = store.dispatch
   yield dispatch(createLoadingAction(true))
   yield dispatch(createLoadingAction(false))
}