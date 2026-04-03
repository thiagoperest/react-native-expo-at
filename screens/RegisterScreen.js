import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import isEmail from 'validator/lib/isEmail';
import { useSession } from '../context/SessionContext';
import { useTheme } from '../context/ThemeContext';

export default function RegisterScreen({ navigation }) {
  const { signUp } = useSession();
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validate = () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      return 'Preencha todos os campos.';
    }
    if (!isEmail(email.trim())) {
      return 'Informe um e-mail válido.';
    }
    if (password.length < 6) {
      return 'A senha deve ter ao menos 6 caracteres.';
    }
    if (password !== confirm) {
      return 'As senhas não coincidem.';
    }
    return null;
  };

  const handleRegister = async () => {
    setError('');
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      await signUp(email.trim().toLowerCase(), password, name.trim());
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.iconWrapper}>
            <MaterialIcons name="person-add" size={64} color={colors.textOnBackground} />
          </View>

          <Text style={[styles.title, { color: colors.textOnBackground }]}>Criar Conta</Text>
          <Text style={[styles.subtitle, { color: colors.textSubtle }]}>Cadastre-se para acessar o catálogo</Text>

          <View style={[styles.card, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
            {error ? (
              <View style={[styles.errorBox, { backgroundColor: colors.errorBg }]}>
                <MaterialIcons name="error-outline" size={18} color={colors.error} />
                <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
              </View>
            ) : null}

            {success ? (
              <View style={[styles.successBox, { backgroundColor: colors.successBg }]}>
                <MaterialIcons name="check-circle" size={18} color={colors.success} />
                <Text style={[styles.successText, { color: colors.success }]}>Conta criada! Redirecionando...</Text>
              </View>
            ) : null}

            <Text style={[styles.label, { color: colors.label }]}>Nome completo</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surfaceVariant, borderColor: colors.border, color: colors.inputText }]}
              placeholder="Seu nome"
              placeholderTextColor={colors.placeholder}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoCorrect={false}
            />

            <Text style={[styles.label, { color: colors.label }]}>E-mail</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surfaceVariant, borderColor: colors.border, color: colors.inputText }]}
              placeholder="seu@email.com"
              placeholderTextColor={colors.placeholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={[styles.label, { color: colors.label }]}>Senha</Text>
            <View style={[styles.passwordWrapper, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
              <TextInput
                style={[styles.passwordInput, { color: colors.inputText }]}
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor={colors.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword((v) => !v)}
                style={styles.eyeButton}
              >
                <MaterialIcons
                  name={showPassword ? 'visibility-off' : 'visibility'}
                  size={22}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <Text style={[styles.label, { color: colors.label }]}>Confirmar Senha</Text>
            <View style={[styles.passwordWrapper, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
              <TextInput
                style={[styles.passwordInput, { color: colors.inputText }]}
                placeholder="Repita a senha"
                placeholderTextColor={colors.placeholder}
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry={!showConfirm}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowConfirm((v) => !v)}
                style={styles.eyeButton}
              >
                <MaterialIcons
                  name={showConfirm ? 'visibility-off' : 'visibility'}
                  size={22}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }, (loading || success) && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={loading || success}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Criar Conta</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={[styles.linkText, { color: colors.textSecondary }]}>
                Já tem uma conta?{' '}
                <Text style={[styles.linkHighlight, { color: colors.primary }]}>Entrar</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconWrapper: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    width: '100%',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    fontSize: 14,
    flex: 1,
  },
  successBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  successText: {
    fontSize: 14,
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 16,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  eyeButton: {
    paddingHorizontal: 14,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
  },
  linkHighlight: {
    fontWeight: '600',
  },
});
