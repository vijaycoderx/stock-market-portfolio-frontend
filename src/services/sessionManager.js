import axios from "axios"

const checkSession = async (username, token) => {
    try {
        // const localSessionToken = localStorage.getItem("JWT_TOKEN")
        if (token != "" && token != undefined) {
            const endpoint = `${process.env.REACT_APP_SERVER_URL}/auth/${username}/check`
            console.log("checksess", endpoint, token)
            const response = await axios.post(endpoint, {username: username}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("check session", response)
            return response;
        } else {
            console.log("logout")
            return false
        }
    } catch (error) {
        console.log("seeion error", error.message)
    }
}

const resetSession = async () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.log("reset seeion error", error.message)
    }
}

const createSession = async (key, token) => {
    try {
        localStorage.setItem(key, token);
    } catch (error) {
        console.log("create seeion error", error.message)
    }
}

export { checkSession, createSession, resetSession };