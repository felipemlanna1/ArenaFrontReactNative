import React, { useState } from 'react';
import { View } from 'react-native';
import { Input } from '@/components/ui/input';
import { ComponentSection } from '../componentSection';
import { ShowcaseItem } from '../showcaseItem';
import { styles } from '../stylesComponentsShowcaseScreen';

interface InputSectionProps {
  onCopyCode: (code: string) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({ onCopyCode }) => {
  const [textInput, setTextInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [numberInput, setNumberInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [textareaInput, setTextareaInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [errorInput, setErrorInput] = useState('');
  const [successInput, setSuccessInput] = useState('Valid input');

  const BASIC_CODE = `import { Input } from '@/components/ui/input';

<Input
  type="text"
  value={value}
  onChangeText={setValue}
  placeholder="Enter text..."
  label="Basic Input"
/>`;

  const EMAIL_CODE = `<Input
  type="email"
  value={email}
  onChangeText={setEmail}
  label="Email"
  placeholder="seu@email.com"
/>`;

  const PASSWORD_CODE = `<Input
  type="password"
  value={password}
  onChangeText={setPassword}
  label="Senha"
  showPasswordToggle={true}
/>`;

  const USERNAME_CODE = `<Input
  type="username"
  value={username}
  onChangeText={setUsername}
  label="Nome de Usuário"
/>`;

  const PHONE_CODE = `<Input
  type="phone"
  value={phone}
  onChangeText={setPhone}
  label="Telefone"
/>`;

  const NUMBER_CODE = `<Input
  type="number"
  value={number}
  onChangeText={setNumber}
  label="Número"
/>`;

  const URL_CODE = `<Input
  type="url"
  value={url}
  onChangeText={setUrl}
  label="Website"
/>`;

  const SEARCH_CODE = `<Input
  type="search"
  value={query}
  onChangeText={setQuery}
  onSearch={handleSearch}
  autoSearch={true}
  debounceMs={300}
  label="Busca"
/>`;

  const TEXTAREA_CODE = `<Input
  type="textarea"
  value={bio}
  onChangeText={setBio}
  label="Biografia"
  rows={4}
  maxRows={10}
  autoGrow={true}
/>`;

  const OTP_CODE = `<Input
  type="otp"
  value={code}
  onChangeText={setCode}
  label="Código"
  maxLength={6}
/>`;

  const VALIDATION_CODE = `<Input type="email" error="Email inválido" />
<Input type="password" success="Senha forte" />
<Input type="text" warning="Campo opcional" />`;

  const SIZES_CODE = `<Input size="xs" placeholder="Extra small" />
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />
<Input size="xl" placeholder="Extra large" />`;

  const STATES_CODE = `<Input required label="Obrigatório" />
<Input disabled label="Desabilitado" />
<Input readonly label="Readonly" />
<Input loading label="Loading" />`;

  return (
    <ComponentSection title="Input">
      <ShowcaseItem
        label="Input Básico"
        description="Input de texto padrão com label e placeholder"
        onCopyCode={onCopyCode}
        code={BASIC_CODE}
      >
        <Input
          type="text"
          value={textInput}
          onChangeText={setTextInput}
          placeholder="Digite algo..."
          label="Input Básico"
          disableAnimations
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="Email"
        description="Input otimizado para email com teclado apropriado"
        onCopyCode={onCopyCode}
        code={EMAIL_CODE}
      >
        <Input
          type="email"
          value={emailInput}
          onChangeText={setEmailInput}
          placeholder="seu@email.com"
          label="Email"
          disableAnimations
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="Senha"
        description="Input seguro com toggle de visibilidade"
        onCopyCode={onCopyCode}
        code={PASSWORD_CODE}
      >
        <Input
          type="password"
          value={passwordInput}
          onChangeText={setPasswordInput}
          placeholder="Digite sua senha"
          label="Senha"
          showPasswordToggle
          disableAnimations
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="Nome de Usuário"
        description="Input para username com autocomplete"
        onCopyCode={onCopyCode}
        code={USERNAME_CODE}
      >
        <Input
          type="username"
          value={usernameInput}
          onChangeText={setUsernameInput}
          placeholder="usuario123"
          label="Nome de Usuário"
          disableAnimations
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="Telefone"
        description="Input para telefone com teclado numérico"
        onCopyCode={onCopyCode}
        code={PHONE_CODE}
      >
        <Input
          type="phone"
          value={phoneInput}
          onChangeText={setPhoneInput}
          placeholder="(11) 99999-9999"
          label="Telefone"
          disableAnimations
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="Número"
        description="Input numérico puro"
        onCopyCode={onCopyCode}
        code={NUMBER_CODE}
      >
        <Input
          type="number"
          value={numberInput}
          onChangeText={setNumberInput}
          placeholder="123"
          label="Número"
          disableAnimations
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="URL"
        description="Input otimizado para URLs"
        onCopyCode={onCopyCode}
        code={URL_CODE}
      >
        <Input
          type="url"
          value={urlInput}
          onChangeText={setUrlInput}
          placeholder="https://exemplo.com"
          label="Website"
          disableAnimations
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="Busca"
        description="Input de busca com debounce e auto-search"
        onCopyCode={onCopyCode}
        code={SEARCH_CODE}
      >
        <Input
          type="search"
          value={searchInput}
          onChangeText={setSearchInput}
          onSearch={() => {}}
          autoSearch
          debounceMs={300}
          placeholder="Buscar atletas..."
          label="Busca"
          fullWidth
          disableAnimations
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="TextArea"
        description="Input multiline com auto-grow"
        onCopyCode={onCopyCode}
        code={TEXTAREA_CODE}
      >
        <Input
          type="textarea"
          value={textareaInput}
          onChangeText={setTextareaInput}
          label="Biografia"
          rows={4}
          maxRows={10}
          autoGrow
          placeholder="Conte sobre você..."
          disableAnimations
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="OTP"
        description="Input para códigos de verificação"
        onCopyCode={onCopyCode}
        code={OTP_CODE}
      >
        <Input
          type="otp"
          value={otpInput}
          onChangeText={setOtpInput}
          placeholder="123456"
          label="Código de Verificação"
          maxLength={6}
          disableAnimations
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="Estados de Validação"
        description="Feedback visual para erros, sucesso e avisos"
        onCopyCode={onCopyCode}
        code={VALIDATION_CODE}
      >
        <View style={styles.inputColumn}>
          <Input
            type="email"
            value={errorInput}
            onChangeText={setErrorInput}
            label="Com Erro"
            error="Email inválido"
            disableAnimations
          />
          <Input
            type="password"
            value={successInput}
            onChangeText={setSuccessInput}
            label="Com Sucesso"
            success="Senha forte e segura"
            disableAnimations
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Tamanhos"
        description="Cinco tamanhos disponíveis (xs, sm, md, lg, xl)"
        onCopyCode={onCopyCode}
        code={SIZES_CODE}
      >
        <View style={styles.inputColumn}>
          <Input
            type="text"
            size="xs"
            value=""
            onChangeText={() => {}}
            placeholder="Extra small"
            disableAnimations
          />
          <Input
            type="text"
            size="sm"
            value=""
            onChangeText={() => {}}
            placeholder="Small"
            disableAnimations
          />
          <Input
            type="text"
            size="md"
            value=""
            onChangeText={() => {}}
            placeholder="Medium"
            disableAnimations
          />
          <Input
            type="text"
            size="lg"
            value=""
            onChangeText={() => {}}
            placeholder="Large"
            disableAnimations
          />
          <Input
            type="text"
            size="xl"
            value=""
            onChangeText={() => {}}
            placeholder="Extra large"
            disableAnimations
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Estados do Input"
        description="Required, disabled, readonly e loading"
        onCopyCode={onCopyCode}
        code={STATES_CODE}
      >
        <View style={styles.inputColumn}>
          <Input
            type="text"
            value=""
            onChangeText={() => {}}
            label="Obrigatório"
            required
            placeholder="Campo obrigatório"
            disableAnimations
          />
          <Input
            type="text"
            value="Desabilitado"
            onChangeText={() => {}}
            label="Desabilitado"
            disabled
            disableAnimations
          />
          <Input
            type="text"
            value="Somente leitura"
            onChangeText={() => {}}
            label="Readonly"
            readonly
            disableAnimations
          />
          <Input
            type="text"
            value="Carregando"
            onChangeText={() => {}}
            label="Loading"
            loading
            disableAnimations
          />
        </View>
      </ShowcaseItem>
    </ComponentSection>
  );
};
