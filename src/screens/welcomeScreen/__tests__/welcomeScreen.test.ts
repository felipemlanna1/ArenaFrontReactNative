import { renderHook, act } from '@testing-library/react-native';
import { useWelcomeScreen } from '../useWelcomeScreen';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(() => Promise.resolve()),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
}));

describe('useWelcomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve iniciar com estado padrão', () => {
    const { result } = renderHook(() => useWelcomeScreen());
    expect(result.current.error).toBeNull();
    expect(result.current.isDev).toBe(true);
    expect(result.current.titleLines).toBeDefined();
    expect(result.current.subtitle).toBeDefined();
  });

  it('deve navegar para showcase quando handleGoToShowcase é chamado', async () => {
    const { result } = renderHook(() => useWelcomeScreen());

    act(() => {
      result.current.handleGoToShowcase();
    });

    expect(mockNavigate).toHaveBeenCalledWith('ComponentsShowcase');
  });

  it('deve navegar para Login quando handleGetStarted é chamado', async () => {
    const { result } = renderHook(() => useWelcomeScreen());

    act(() => {
      result.current.handleGetStarted();
    });

    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });

  it('deve navegar para Register quando handleCreateAccount é chamado', async () => {
    const { result } = renderHook(() => useWelcomeScreen());

    act(() => {
      result.current.handleCreateAccount();
    });

    expect(mockNavigate).toHaveBeenCalledWith('Register');
  });
});
