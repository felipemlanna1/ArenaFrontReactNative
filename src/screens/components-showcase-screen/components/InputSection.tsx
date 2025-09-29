import React, { useState } from 'react';
import { View } from 'react-native';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { SearchInput } from '@/components/ui/search-input';
import { ComponentSection } from '../component-section';
import { ShowcaseItem } from '../showcase-item';
import { styles as componentStyles } from '../stylesComponentsShowcaseScreen';

interface InputSectionProps {
  onCopyCode: (code: string) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({ onCopyCode }) => {
  const [basicInput, setBasicInput] = useState('');
  const [labelInput, setLabelInput] = useState('');
  const [errorInput, setErrorInput] = useState('');
  const [successInput, setSuccessInput] = useState('Valid input');
  const [requiredInput, setRequiredInput] = useState('');
  const [disabledInput, setDisabledInput] = useState('Disabled');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ComponentSection title="Input Fields">
      <ShowcaseItem
        label="Basic Input"
        description="Standard input field with placeholder"
        onCopyCode={onCopyCode}
        code={`import { Input } from '@/components/ui/input';
<Input
  value={value}
  onChangeText={setValue}
  placeholder="Enter text..."
/>`}
      >
        <Input
          value={basicInput}
          onChangeText={setBasicInput}
          placeholder="Enter basic text..."
          testID="input-basic"
          disableAnimations
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="Input with Label"
        description="Input field with descriptive label"
        onCopyCode={onCopyCode}
        code={`<Input
  label="Name"
  value={value}
  onChangeText={setValue}
  placeholder="Enter your name..."
/>`}
      >
        <Input
          label="Name"
          value={labelInput}
          onChangeText={setLabelInput}
          placeholder="Enter your name..."
          testID="input-label"
          disableAnimations
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="Validation States"
        description="Visual feedback for validation"
        onCopyCode={onCopyCode}
        code={`<Input error="This field is required" />
<Input success="Input confirmed" />`}
      >
        <View style={componentStyles.inputColumn}>
          <Input
            label="Error State"
            value={errorInput}
            onChangeText={setErrorInput}
            placeholder="Required field"
            error="This field is required"
            testID="input-error"
            disableAnimations
          />
          <Input
            label="Success State"
            value={successInput}
            onChangeText={setSuccessInput}
            placeholder="Valid field"
            success="Input confirmed"
            testID="input-success"
            disableAnimations
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Input States"
        description="Required and disabled states"
        onCopyCode={onCopyCode}
        code={`<Input required label="Required" />
<Input disabled value="Disabled" />`}
      >
        <View style={componentStyles.inputColumn}>
          <Input
            label="Required Field"
            value={requiredInput}
            onChangeText={setRequiredInput}
            placeholder="Enter required text..."
            required
            testID="input-required"
            disableAnimations
          />
          <Input
            label="Disabled Field"
            value={disabledInput}
            onChangeText={setDisabledInput}
            disabled
            testID="input-disabled"
            disableAnimations
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Input Sizes"
        description="Different sizes for various contexts"
        onCopyCode={onCopyCode}
        code={`<Input size="xs" placeholder="Extra small" />
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />
<Input size="xl" placeholder="Extra large" />`}
      >
        <View style={componentStyles.inputColumn}>
          <Input
            size="xs"
            placeholder="Extra small input"
            value=""
            onChangeText={() => {}}
            disableAnimations
          />
          <Input
            size="sm"
            placeholder="Small input"
            value=""
            onChangeText={() => {}}
            disableAnimations
          />
          <Input
            size="md"
            placeholder="Medium input"
            value=""
            onChangeText={() => {}}
            disableAnimations
          />
          <Input
            size="lg"
            placeholder="Large input"
            value=""
            onChangeText={() => {}}
            disableAnimations
          />
          <Input
            size="xl"
            placeholder="Extra large input"
            value=""
            onChangeText={() => {}}
            disableAnimations
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Password Input"
        description="Secure input with visibility toggle"
        onCopyCode={onCopyCode}
        code={`import { PasswordInput } from '@/components/ui/password-input';
<PasswordInput
  value={password}
  onChangeText={setPassword}
  showStrength
/>`}
      >
        <View style={componentStyles.inputColumn}>
          <PasswordInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password..."
            testID="password-basic"
            disableAnimations
          />
          <PasswordInput
            label="Password with Strength"
            value={passwordStrength}
            onChangeText={setPasswordStrength}
            placeholder="Enter strong password..."
            showStrength
            testID="password-strength"
            disableAnimations
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Search Input"
        description="Specialized input for search functionality"
        onCopyCode={onCopyCode}
        code={`import { SearchInput } from '@/components/ui/search-input';
<SearchInput
  value={query}
  onChangeText={setQuery}
  onSearch={handleSearch}
  placeholder="Search..."
/>`}
      >
        <View style={componentStyles.buttonRow}>
          <View style={componentStyles.buttonColumn}>
            <SearchInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSearch={() => {}}
              placeholder="Search athletes..."
              size="md"
              fullWidth
              disableAnimations
              testID="search-input"
            />
          </View>
        </View>
      </ShowcaseItem>
    </ComponentSection>
  );
};
