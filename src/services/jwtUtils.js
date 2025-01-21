import { jwtDecode } from "jwt-decode"

const readJWT = (token) => {
    try {
        const jwtData = jwtDecode(token);
        return jwtData
    } catch (error) {
        console.log("readJwt error", error.message)
    }
    
}

export { readJWT };