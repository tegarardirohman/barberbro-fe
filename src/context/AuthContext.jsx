import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const { response, error: axiosError, loading, request } = useAxios();
    const [userDetail, setUserDetail] = useState({});
    
    const navigate = useNavigate();

    // Fetch user details based on role
    const fetchUserDetail = async (role) => {
        try {
            const res = await request(`/${role}/current`);
            setUserDetail(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
    
    // Refresh user details
    const refreshUserDetail = async () => {
        let detail = null;

        if (user?.role.includes('CUSTOMER')) {
            detail = await fetchUserDetail('customers');
        } else if (user?.role.includes('STAFF')) {
            detail = await fetchUserDetail('barbers');
        }

        return detail;
    };

    // Handle Login
    const login = async (email, password, remember) => {
        try {
            const res = await request('/login', 'POST', { email, password });

            if (res.statusCode === 201) {
                const userData = {
                    id: res.data.userId,
                    email: res.data.email,
                    role: res.data.role,
                    token: res.data.token,
                };

                setUser(userData); // Update user state

                if (remember) {
                    localStorage.setItem('user', JSON.stringify(userData));
                } else {
                    sessionStorage.setItem('user', JSON.stringify(userData));
                }

                // Navigate based on role
                if (userData.role.includes('ADMIN')) {
                    navigate('/admin/');
                } else if (userData.role.includes('CUSTOMER')) {
                    fetchUserDetail('customers');
                    // navigate('/');
                } else if (userData.role.includes('STAFF')) {
                    fetchUserDetail('barbers');
                    navigate('/staff');
                }

                return "success";

            } else {
                return res?.data.message;
            }
        } catch (err) {
            setError(err.message || 'Login failed');
            console.log("login failed", err);
        }
    };

    // Handle Registration
    const register = async (email, password) => {
        try {
            const res = await request('/customer/register', 'POST', { email, password, role: "CUSTOMER" });

            if (res.statusCode === 201) {
                navigate('/');
                return "success";
            } else {
                setError(axiosError || 'Registration failed');
                return res?.message;
            }
        } catch (err) {
            setError(err.message || 'Registration failed');
            console.log("registration failed", err);
        }
    };

    // Handle Logout
    const logout = useCallback(() => {
        setUser(null);
        setUserDetail({});
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        navigate('/');
    }, [navigate]);

    // Check stored session on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                console.log("User set after refresh:", parsedUser);
            } catch (error) {
                console.log("Error parsing stored user", error);
                localStorage.removeItem('user');
                sessionStorage.removeItem('user');
            }
        }
    }, []);

    useEffect(() => {
        if (user){
            refreshUserDetail();
        }
    }, [user])

    return (
        <AuthContext.Provider value={{ user, userDetail, refreshUserDetail, error, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook for accessing AuthContext
export function useAuth() {
    return useContext(AuthContext);
}
