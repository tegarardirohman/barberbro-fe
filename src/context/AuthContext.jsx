import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null); // Track errors
    const navigate = useNavigate();
    const { response, error: axiosError, loading, request } = useAxios();

    // Menangani Login
    const login = async (email, password, remember) => {

        try {
            const res = await request(`/login`, "POST", { email, password });

            console.log(res);

            if (res) {

                const userData = {
                    id: res.data.userId,
                    email: res.data.email,
                    role: res.data.role,
                    token: res.data.token,
                };

                if (remember) {
                    localStorage.setItem('user', JSON.stringify(userData));
                } else {
                    sessionStorage.setItem('user', JSON.stringify(userData));
                }

                // Navigasi berdasarkan peran
                if (userData.role.includes('ADMIN')) {
                    navigate('/admin/');
                } else if (userData.role.includes('CUSTOMER')) {
                    navigate('/');
                } else if (userData.role.includes('STAFF')) {
                    navigate('/staff');
                }
            }

        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    // Menangani Registrasi
    const register = async (email, password) => {

        try {
            await request(`/register`, "POST", { email, password, role: "CUSTOMER" });

            if (!axiosError) {
                navigate('/');
            }
        } catch (err) {
            setError(err.message || 'Registration failed');
        }
    };

    // Menangani Logout
    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        navigate('/login');
    }, [navigate]);

    // Memeriksa sesi yang tersimpan pada mount
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
