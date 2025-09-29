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

  it('deve navegar para showcase quando handleLogin é chamado', async () => {
    const { result } = renderHook(() => useWelcomeScreen());

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(mockNavigate).toHaveBeenCalledWith('ComponentsShowcase');
  });

  it('deve setar loading quando handleGetStarted é chamado', async () => {
    const { result } = renderHook(() => useWelcomeScreen());

    act(() => {
      result.current.handleGetStarted();
    });

    expect(mockNavigate).toHaveBeenCalledWith('ComponentsShowcase');
  });
});
