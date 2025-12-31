import axios from "axios";


const api = axios.create({
    baseURL: "https://jwtapi1111.onrender.com/api",
    withCredentials: true,  // using because we are using cookies
})

async function API(config) {
    try {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            }
        }
        return await api(config)
    } catch (error) {
        if (error.response.status === 401) {
            try {
                // generating access token if our refresh token is valid
                const data = await api.post('/auth/refresh-token')  // calling the refresh token api
                localStorage.setItem('token', data.accessToken)
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${data.accessToken}`,
                }
                return await api(config)
            } catch (refreshError) {
                // if refresh token is not valid, redirect to login page
                // window.location.href = '/login'
            }
        }
    }
}

export const logout = async () => {
    try {
        await api.post('/auth/logout')     // calling the logout api
        localStorage.removeItem('token')
        window.location.href = '/login'
    } catch (error) {
        
    }
}

export {API}
