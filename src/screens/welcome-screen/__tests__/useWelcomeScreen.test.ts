import { renderHook, act } from '@testing-library/react-native';
import { useWelcomeScreen } from '../useWelcomeScreen';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('useWelcomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve iniciar com estado padrão', () => {
    const { result } = renderHook(() => useWelcomeScreen());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('deve navegar para showcase quando handleShowComponents é chamado', () => {
    const { result } = renderHook(() => useWelcomeScreen());

    act(() => {
      result.current.actions.handleShowComponents();
    });

    expect(mockNavigate).toHaveBeenCalledWith('ComponentsShowcase');
  });

  it('deve setar loading quando handleGetStarted é chamado', () => {
    const { result } = renderHook(() => useWelcomeScreen());

    act(() => {
      result.current.actions.handleGetStarted();
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('deve resetar estados quando handleReset é chamado', () => {
    const { result } = renderHook(() => useWelcomeScreen());

    act(() => {
      result.current.actions.handleReset();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
