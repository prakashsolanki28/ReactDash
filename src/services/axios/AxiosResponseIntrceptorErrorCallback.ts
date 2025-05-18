import type { AxiosError } from 'axios'
import { setSessionSignedIn, resetUser, useToken } from '@/store/slices/authSlice';
import { store } from '@/store';


const unauthorizedCode = [401, 419, 440]

const AxiosResponseIntrceptorErrorCallback = (error: AxiosError) => {
    const { response } = error
    const { setToken } = useToken()

    if (response && unauthorizedCode.includes(response.status)) {
        setToken('')
        store.dispatch(resetUser());
        store.dispatch(setSessionSignedIn(false));
    }
}

export default AxiosResponseIntrceptorErrorCallback
