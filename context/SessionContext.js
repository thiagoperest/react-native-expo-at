import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const mapError = (message) => {
  switch (message) {
    case 'Invalid login credentials':
      return 'E-mail ou senha inválidos.';
    case 'User already registered':
      return 'Este e-mail já está cadastrado.';
    case 'Email not confirmed':
      return 'Confirme seu e-mail antes de fazer login.';
    case 'Password should be at least 6 characters.':
      return 'A senha deve ter ao menos 6 caracteres.';
    default:
      return 'Ocorreu um erro. Tente novamente.';
  }
};

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, name) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });
    if (error) throw new Error(mapError(error.message));
  };

  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(mapError(error.message));
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(mapError(error.message));
  };

  return (
    <SessionContext.Provider value={{ session, loading, signUp, signIn, signOut }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession deve ser usado dentro do SessionProvider');
  return ctx;
}
