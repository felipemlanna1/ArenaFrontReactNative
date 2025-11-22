# TestID Checklist - Arena Mobile

## ✅ Componentes com testID Implementados

### LoginScreen
- ✅ `email-input` - Input de email
- ✅ `password-input` - Input de senha
- ✅ `submit-button` - Botão de login
- ✅ `register-button` - Botão de cadastro

### HomeScreen
- ✅ `home-screen` - Container principal da tela
- ✅ `create-event-fab` - FAB de criar evento

---

## 🚧 Componentes Pendentes (Para Futuro)

### RegisterScreen
- ⬜ `register-name-input` - Input de nome
- ⬜ `register-email-input` - Input de email
- ⬜ `register-password-input` - Input de senha
- ⬜ `register-confirm-password-input` - Input de confirmar senha
- ⬜ `register-submit-button` - Botão de cadastro
- ⬜ `register-login-link` - Link para voltar ao login

### OnboardingScreen
- ⬜ `onboarding-screen` - Container principal
- ⬜ `sport-card-{sport}` - Cards de esportes (football, basketball, etc)
- ⬜ `onboarding-next-button` - Botão próximo
- ⬜ `onboarding-skip-button` - Botão pular

### CreateEventScreen
- ⬜ `event-name-input` - Input de nome do evento
- ⬜ `event-description-input` - Input de descrição
- ⬜ `event-location-input` - Input de localização
- ⬜ `event-date-picker` - DatePicker de data
- ⬜ `event-time-picker` - DatePicker de hora
- ⬜ `max-participants-input` - Input de participantes máximos
- ⬜ `sport-card-{sport}` - Cards de seleção de esporte
- ⬜ `privacy-public-option` - Opção de privacidade pública
- ⬜ `privacy-private-option` - Opção de privacidade privada
- ⬜ `create-event-submit-button` - Botão publicar evento
- ⬜ `create-event-next-button` - Botão próximo step
- ⬜ `create-event-back-button` - Botão voltar step

### EventDetailsScreen
- ⬜ `event-details-screen` - Container principal
- ⬜ `event-join-button` - Botão participar
- ⬜ `event-leave-button` - Botão sair do evento
- ⬜ `event-share-button` - Botão compartilhar
- ⬜ `event-manage-button` - Botão gerenciar (organizador)

### FilterScreen / FilterModal
- ⬜ `filter-sport-{sport}` - Checkbox de esporte
- ⬜ `filter-state-dropdown` - Dropdown de estado
- ⬜ `filter-city-dropdown` - Dropdown de cidade
- ⬜ `filter-date-picker` - DatePicker de data
- ⬜ `filter-apply-button` - Botão aplicar filtros
- ⬜ `filter-clear-button` - Botão limpar filtros

### ProfileScreen
- ⬜ `profile-screen` - Container principal
- ⬜ `profile-edit-button` - Botão editar perfil
- ⬜ `profile-name-text` - Nome do usuário
- ⬜ `profile-bio-text` - Bio do usuário

### EditProfileScreen
- ⬜ `edit-profile-name-input` - Input de nome
- ⬜ `edit-profile-bio-input` - Input de bio
- ⬜ `edit-profile-avatar-button` - Botão trocar foto
- ⬜ `edit-profile-save-button` - Botão salvar

---

## 📝 Convenção de Nomenclatura

### Padrão Geral
`{screen/categoria}-{componente}-{tipo}`

### Tipos Comuns
- `input` - Campos de texto
- `button` - Botões de ação
- `picker` - Seletores de data/hora
- `dropdown` - Dropdowns/selects
- `card` - Cards clicáveis
- `checkbox` - Checkboxes
- `switch` - Switches/toggles
- `screen` - Container da tela
- `fab` - Floating action buttons
- `modal` - Modais
- `link` - Links/navegação

### Exemplos
```tsx
// Telas
testID="home-screen"
testID="profile-screen"
testID="login-screen"

// Inputs
testID="email-input"
testID="password-input"
testID="event-name-input"

// Botões
testID="submit-button"
testID="register-button"
testID="create-event-submit-button"

// Cards dinâmicos (com variável)
testID={`sport-card-${sport.id}`}
testID={`event-card-${event.id}`}

// Componentes com estado
testID="privacy-public-option"
testID="filter-sport-football"
```

---

## 🔧 Como Adicionar testID

### Componentes UI Arena
Os componentes já suportam `testID`:

```tsx
// Input
<Input
  testID="email-input"
  label="Email"
  value={email}
  onChangeText={setEmail}
/>

// Button
<Button
  testID="submit-button"
  onPress={handleSubmit}
>
  Enviar
</Button>

// View/Container
<View testID="home-screen" style={styles.container}>
  {children}
</View>
```

### Componentes Customizados
Propagar testID nas props:

```tsx
interface MyComponentProps {
  testID?: string;
  // outras props...
}

export const MyComponent: React.FC<MyComponentProps> = ({
  testID,
  ...
}) => {
  return (
    <View testID={testID}>
      {/* conteúdo */}
    </View>
  );
};
```

---

## ✅ Validação

Antes de mergear PR com novos componentes, verificar:
- [ ] Componentes críticos têm testID
- [ ] testID segue convenção de nomenclatura
- [ ] testID é único no contexto da tela
- [ ] Teste E2E criado para novo fluxo (se aplicável)

---

**Última atualização**: FASE 1 - Setup inicial
