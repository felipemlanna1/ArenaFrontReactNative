import { renderHook, act } from '@testing-library/react-native';
import { useComponentsShowcaseScreen } from '../useComponentsShowcaseScreen';
const mockGoBack = jest.fn();
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
    navigate: mockNavigate,
  }),
}));
describe('useComponentsShowcaseScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('deve iniciar com estado padrão', () => {
    const { result } = renderHook(() => useComponentsShowcaseScreen());
    expect(result.current.activeSection).toBe('text');
  });
  it('deve alternar seção quando handleSectionToggle é chamado', () => {
    const { result } = renderHook(() => useComponentsShowcaseScreen());
    act(() => {
      result.current.actions.handleSectionToggle('buttons');
    });
    expect(result.current.activeSection).toBe('buttons');
    act(() => {
      result.current.actions.handleSectionToggle('buttons');
    });
    expect(result.current.activeSection).toBeNull();
  });
  it('deve voltar quando handleBackPress é chamado', () => {
    const { result } = renderHook(() => useComponentsShowcaseScreen());
    act(() => {
      result.current.actions.handleBackPress();
    });
    expect(mockGoBack).toHaveBeenCalled();
  });
  it('deve logar código quando handleCopyCode é chamado', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const { result } = renderHook(() => useComponentsShowcaseScreen());
    act(() => {
      result.current.actions.handleCopyCode('test code');
    });
    expect(consoleSpy).toHaveBeenCalledWith('Código copiado:', 'test code');
    consoleSpy.mockRestore();
  });
});
