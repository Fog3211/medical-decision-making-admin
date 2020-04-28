
import { lodashUtils } from '@utils/index'

export default (state, action) => {
    if (action) {
        return lodashUtils.merge(lodashUtils.cloneDeep(state), action)
    } else {
        return state
    }
}