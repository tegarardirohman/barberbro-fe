import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null); // Track errors
    const navigate = useNavigate();
    const { response, error: axiosError, loading, request } = useAxios();

    // Handle Login
    const login = async (email, password, remember) => {
        try {
            const res = await request('/login', 'POST', { email, password });

            console.log(res)

            if (res) {

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

                console.log(userData)

                // Navigate based on role
                if (userData.role.includes('ADMIN')) {
                    navigate('/admin/');
                } else if (userData.role.includes('CUSTOMER')) {
                    navigate('/');
                } else if (userData.role.includes('STAFF')) {
                    navigate('/staff');
                }

            } else {
                setError(axiosError || 'Login failed');
                console.log(axiosError || 'Login failed');
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

            if (res) {
                navigate('/');
            } else {
                setError(axiosError || 'Registration failed');
            }
        } catch (err) {
            setError(err.message || 'Registration failed');
            console.log("registration failed", err);
        } 
    };

    // Handle Logout
    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        navigate('/');
    }, [navigate]);

    // Check stored session on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                localStorage.removeItem('user');
                sessionStorage.removeItem('user');
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, error, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
