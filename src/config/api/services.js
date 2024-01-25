import { HttpGet, HttpPost, HttpPut } from ".";

const login = async ({
    email,
    password
}) => {
    try {
        return await HttpPost(`auths/login`, {
            email,
            password,
        }, null);
    } catch (error) {
        throw error
    }
}

const getUserAttendanceToday = async ({ type }) => {
    try {
        return await HttpGet(`attendances/${type}`, null);
    } catch (error) {
        throw error
    }
}

const clockSubmitUser = async ({ type }) => {
    try {
        return await HttpPost(`attendances/`, {
            type: type,
        }, null);
    } catch (error) {
        throw error
    }
}

const fetchAttendance = async ({ from, to, page, limit }) => {
    try {
        return await HttpGet(`attendances?from=${from}&to=${to}&page=${page}&limit=${limit}`, null);
    } catch (error) {
        throw error
    }
}
const fetchUserProfile = async () => {
    try {
        return await HttpGet(`accounts`, null);
    } catch (error) {
        throw error
    }
}

const updatePassword = async ({
    oldPassword,
    newPassword,
    confirmPassword,
}) => {
    try {
        return await HttpPut(`accounts/security`, {
            oldPassword,
            password: newPassword,
            confirmPassword,
        }, null);
    } catch (error) {
        throw error
    }
}

const updateProfile = async ({
    phone,
    profile
}) => {
    try {
        return await HttpPut(`accounts/information`, {
            profile,
            phone
        }, null);
    } catch (error) {
        throw error
    }
}

const uploadDocument = async (data) => {
    try {
        return await HttpPost(`uploads`, data, null);
    } catch (error) {
        throw error
    }
}

export {
    login,
    clockSubmitUser,
    getUserAttendanceToday,
    fetchAttendance,
    fetchUserProfile,
    updatePassword,
    updateProfile,
    uploadDocument,
}