import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [ckeckingStatus, setCkeckingStatus] = useState(true)

    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        if(user) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }

        setCkeckingStatus(false)
    }, [user])

    return {loggedIn, ckeckingStatus}
}