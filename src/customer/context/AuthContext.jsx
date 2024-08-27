import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    // login
    const { response, error: apiError, loading: apiLoading, fetchData } = useAxios({
        url: '/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        autoFetch: false
    });


    // register
    const { response: registerResponse, error: registerError, loading: registerLoading, fetchData: registerFetchData } = useAxios({
        url: '/auth/signup/customer',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        autoFetch: false
    });

    const login = async (email, password, remember) => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetchData({
                data: { 
                    email, 
                    password 
                }, 
                headers: { 'Content-Type': 'application/json' }
            });

            if (apiError) {
                throw new Error(apiError);
            }

            if (apiLoading) return;

            
            // decode token
            const decoded = jwtDecode(result.data.token);


            // set user data
            const userData = {
                id: decoded.sub,
                email: result.data.email,
                role: result.data.role,
                token: result.data.token,
            }

            setUser(userData); 

            if (remember) {
                localStorage.setItem('user', JSON.stringify(userData));
            } else {
                sessionStorage.setItem('user', JSON.stringify(userData));
            }

            // TODO: add redirect based on role role = ['ROLE_ADMIN', 'ROLE_CUSTOMER', 'ROLE_STAFF']
            if (userData.role.includes('ROLE_ADMIN')) {
                navigate('/admin/');
            } else if (userData.role.includes('ROLE_CUSTOMER')) {
                navigate('/');
            } else if (userData.role.includes('ROLE_STAFF')) {
                navigate('/staff');
            }



        } catch (error) {
            setError(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const register = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const result = await registerFetchData({
                data,
                headers: { 'Content-Type': 'application/json' }
            });

            if (registerError) {
                throw new Error(registerError);
            }

            if (registerLoading) return;

            navigate('/login');
        } catch (error) {
            setError(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        navigate('/login');
    }, [navigate]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedUserSession = sessionStorage.getItem('user');

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                localStorage.removeItem('user');
            }
        } else if(storedUserSession) {
            try{
                setUser(JSON.parse(storedUserSession));
            } catch (error) {
                sessionStorage.removeItem('user');
            }
        } else {
            navigate('/login');
        }

    }, [])



    return (
        <AuthContext.Provider value={{ user, error, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
