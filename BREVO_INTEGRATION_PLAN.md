# Plano de Integração: Brevo Email Service

## 📋 Índice
- [1. Análise Atual](#1-análise-atual)
- [2. Arquitetura Proposta](#2-arquitetura-proposta)
- [3. Backend: Implementação Necessária](#3-backend-implementação-necessária)
- [4. Frontend: Implementação Necessária](#4-frontend-implementação-necessária)
- [5. Configuração no Brevo](#5-configuração-no-brevo)
- [6. Plano de Implementação](#6-plano-de-implementação)
- [7. Checklist de Deploy](#7-checklist-de-deploy)

---

## 1. Análise Atual

### 1.1 Backend: O que já existe ✅

**Infraestrutura de Email**
- ✅ Módulo email completo com arquitetura modular (`src/modules/email/`)
- ✅ EmailService com logging e tratamento de erros
- ✅ Templates Handlebars (password-reset, password-changed)
- ✅ Interface-driven design (IEmailSender, IEmailTemplateBuilder)
- ✅ UrlBuilderService preparado para verificação de email
- ✅ Constantes definindo tipos de email (welcome, verification, eventos)
- ✅ Campo `isEmailVerified` na entidade User

**Funcionalidades Implementadas**
- ✅ Email de reset de senha (com código de 6 dígitos)
- ✅ Email de notificação de senha alterada
- ✅ Endpoint `/auth/forgot-password` funcionando

### 1.2 Backend: O que falta ❌

**Funcionalidades Críticas**
- ❌ Método `sendWelcomeEmail()` no EmailService
- ❌ Método `sendEmailVerificationEmail()` no EmailService
- ❌ Template `welcome.hbs` (boas-vindas)
- ❌ Template `email-verification.hbs` (confirmação)
- ❌ Campos `emailVerificationToken` e `emailVerificationTokenExpires` no User entity
- ❌ Endpoint `POST /auth/verify-email` (para confirmar email)
- ❌ Endpoint `POST /auth/resend-verification` (para reenviar código)
- ❌ Integração com Brevo (usando apenas SMTP genérico)
- ❌ Lógica de geração de código de verificação (6 dígitos)
- ❌ Migration para adicionar campos de verificação

### 1.3 Frontend: O que já existe ✅

**Estrutura**
- ✅ AuthContext com fluxo de autenticação
- ✅ RegisterScreen completo com validação
- ✅ Métodos `verifyEmail()` e `resendVerificationEmail()` no authService
- ✅ VerifyCodeScreen (usado para reset de senha)
- ✅ Campo `isEmailVerified` na interface UserData
- ✅ Deep linking configurado (arena://, https://)
- ✅ Exibição de status de verificação no ProfileScreen

### 1.4 Frontend: O que falta ❌

**Telas e Navegação**
- ❌ VerifyEmailScreen (tela específica para verificação de email)
- ❌ Navegação pós-registro direcionando para VerifyEmail
- ❌ Deep linking para `/verify-email/:token`
- ❌ Modal/aviso de email não verificado (opcional)
- ❌ Intent filter Android para email verification
- ❌ Associated domain iOS para email verification

---

## 2. Arquitetura Proposta

### 2.1 Fluxo Completo: Registro → Verificação → Boas-vindas

```
┌─────────────────────────────────────────────────────────────────┐
│                    REGISTRO DE USUÁRIO                           │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
            Frontend: RegisterScreen
                  (coleta dados)
                       │
                       ▼
         POST /auth/register (Backend)
                       │
                       ├─ Cria usuário (isEmailVerified: false)
                       ├─ Gera código de verificação (6 dígitos)
                       ├─ Salva no DB (emailVerificationToken + expires)
                       ├─ Envia email via Brevo (sendEmailVerificationEmail)
                       └─ Retorna {user, access_token}
                       │
                       ▼
       Frontend: Navega para VerifyEmailScreen
              (mostra campo para 6 dígitos)
                       │
                       ▼
┌──────────────────────┴───────────────────────────────────────────┐
│                   VERIFICAÇÃO DE EMAIL                            │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       ├─ User digita código de 6 dígitos
                       │  (ou clica em link do email)
                       │
                       ▼
         POST /auth/verify-email {code} (Backend)
                       │
                       ├─ Valida código
                       ├─ Verifica expiração (24h)
                       ├─ Atualiza isEmailVerified: true
                       ├─ Limpa token do DB
                       ├─ Envia email de boas-vindas (sendWelcomeEmail)
                       └─ Retorna {success: true}
                       │
                       ▼
       Frontend: Navega para OnboardingSportsScreen
                       │
                       ▼
┌──────────────────────┴───────────────────────────────────────────┐
│                      EMAIL DE BOAS-VINDAS                         │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       ▼
        Brevo envia email de welcome
              (template personalizado)
                       │
                       ▼
             User continua onboarding
                   (MainTabs)
```

### 2.2 Opções de Verificação

**Opção A: Código de 6 Dígitos (Recomendado)**
- User recebe email com código
- Digita código na tela VerifyEmailScreen
- Validação via `POST /auth/verify-email`
- UX similar ao reset de senha
- Menos dependente de deep linking

**Opção B: Link no Email**
- User clica em link no email
- Deep link abre app em VerifyEmailScreen
- Auto-verifica com token na URL
- Melhor UX se deep linking funcionar bem

**Opção C: Híbrida (Melhor UX)**
- Email contém AMBOS: código E link
- User escolhe método preferido
- Fallback para código se link não funcionar

---

## 3. Backend: Implementação Necessária

### 3.1 Dependências

#### Instalar SDK do Brevo
```bash
cd /Users/felipemoreiralanna/Documents/GitHub/BackSportPulseMobile
npm install @getbrevo/brevo --save
```

### 3.2 Variáveis de Ambiente

Adicionar ao `.env`:
```env
# Brevo Configuration
BREVO_API_KEY=seu-api-key-aqui
BREVO_SENDER_EMAIL=noreply@seudominio.com
BREVO_SENDER_NAME=Arena SportPulse

# Frontend URL (para deep links)
FRONTEND_URL=https://backsportpulsemobile-production.up.railway.app
FRONTEND_DEEP_LINK=arena://

# Email Verification
EMAIL_VERIFICATION_EXPIRES_IN=24h
VERIFICATION_CODE_LENGTH=6
```

### 3.3 Arquivos a Criar/Modificar

#### ✅ CRIAR: `src/modules/email/brevo/brevo.service.ts`
```typescript
import * as brevo from '@getbrevo/brevo';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface BrevoEmailParams {
  to: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
}

@Injectable()
export class BrevoService {
  private apiInstance: brevo.TransactionalEmailsApi;
  private readonly logger = new Logger(BrevoService.name);

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('BREVO_API_KEY');
    const defaultClient = brevo.ApiClient.instance;
    const apiKeyAuth = defaultClient.authentications['api-key'];
    apiKeyAuth.apiKey = apiKey;
    this.apiInstance = new brevo.TransactionalEmailsApi();
  }

  async sendEmail(params: BrevoEmailParams): Promise<void> {
    const { to, subject, htmlContent, textContent } = params;

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.to = [{ email: to }];
    sendSmtpEmail.sender = {
      email: this.configService.get<string>('BREVO_SENDER_EMAIL'),
      name: this.configService.get<string>('BREVO_SENDER_NAME'),
    };
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.textContent = textContent || subject;

    try {
      const response = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
      this.logger.log(`Email enviado via Brevo: ${response.body.messageId}`);
    } catch (error) {
      this.logger.error(`Erro ao enviar email via Brevo: ${error.message}`);
      throw error;
    }
  }
}
```

#### ✅ MODIFICAR: `src/modules/email/email.module.ts`
```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BrevoService } from './brevo/brevo.service';
import { EmailService } from './email.service';
// ... outros imports

@Module({
  imports: [ConfigModule],
  providers: [
    EmailService,
    BrevoService, // ← ADICIONAR
    // ... outros providers
  ],
  exports: [EmailService],
})
export class EmailModule {}
```

#### ✅ MODIFICAR: `src/modules/email/services/email-sender.service.ts`
```typescript
import { Injectable, Inject } from '@nestjs/common';
import { IEmailSender } from '../interfaces/email.interfaces';
import { BrevoService } from '../brevo/brevo.service';

@Injectable()
export class EmailSenderService implements IEmailSender {
  constructor(private readonly brevoService: BrevoService) {}

  async sendEmail(emailData: EmailData): Promise<void> {
    await this.brevoService.sendEmail({
      to: emailData.to,
      subject: emailData.subject,
      htmlContent: emailData.html,
      textContent: emailData.text,
    });
  }
}
```

#### ✅ CRIAR: `src/modules/email/templates/email-verification.hbs`
```handlebars
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; padding: 40px; }
    .logo { text-align: center; margin-bottom: 30px; }
    .header { font-size: 24px; font-weight: bold; color: #1B1D29; margin-bottom: 20px; }
    .code-box { background: #FF5301; color: #FFFFFF; font-size: 48px; font-weight: bold; text-align: center; padding: 30px; border-radius: 8px; letter-spacing: 8px; margin: 30px 0; }
    .text { font-size: 16px; color: #4A4A4A; line-height: 1.6; margin-bottom: 20px; }
    .button { display: inline-block; background: #FF5301; color: #FFFFFF; text-decoration: none; padding: 15px 40px; border-radius: 6px; font-weight: bold; margin: 20px 0; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #EEEEEE; font-size: 12px; color: #999999; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <h1 style="color: #FF5301;">Arena</h1>
    </div>
    <div class="header">Confirme seu email, {{name}}!</div>
    <div class="text">
      Bem-vindo(a) à Arena! Para começar a usar sua conta, confirme seu endereço de email usando o código abaixo:
    </div>
    <div class="code-box">{{verificationCode}}</div>
    <div class="text">
      Ou clique no botão abaixo para confirmar automaticamente:
    </div>
    <div style="text-align: center;">
      <a href="{{verificationUrl}}" class="button">Confirmar Email</a>
    </div>
    <div class="text">
      Este código expira em <strong>{{expirationTime}}</strong>.
    </div>
    <div class="text" style="font-size: 14px; color: #999999;">
      Se você não criou uma conta na Arena, ignore este email.
    </div>
    <div class="footer">
      &copy; {{year}} Arena SportPulse. Todos os direitos reservados.
    </div>
  </div>
</body>
</html>
```

#### ✅ CRIAR: `src/modules/email/templates/welcome.hbs`
```handlebars
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; padding: 40px; }
    .logo { text-align: center; margin-bottom: 30px; }
    .header { font-size: 28px; font-weight: bold; color: #1B1D29; margin-bottom: 20px; text-align: center; }
    .text { font-size: 16px; color: #4A4A4A; line-height: 1.6; margin-bottom: 20px; }
    .features { background: #F8F9FA; border-left: 4px solid #FF5301; padding: 20px; margin: 30px 0; border-radius: 4px; }
    .features ul { margin: 0; padding-left: 20px; }
    .features li { margin: 10px 0; color: #4A4A4A; }
    .button { display: inline-block; background: #FF5301; color: #FFFFFF; text-decoration: none; padding: 15px 40px; border-radius: 6px; font-weight: bold; margin: 20px 0; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #EEEEEE; font-size: 12px; color: #999999; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <h1 style="color: #FF5301;">Arena</h1>
    </div>
    <div class="header">🎉 Bem-vindo(a) à Arena, {{name}}!</div>
    <div class="text">
      Estamos muito felizes em ter você conosco! Seu email foi confirmado com sucesso e sua conta está pronta para uso.
    </div>
    <div class="features">
      <strong style="color: #1B1D29; font-size: 18px;">O que você pode fazer na Arena:</strong>
      <ul>
        <li>Criar e participar de eventos esportivos</li>
        <li>Conectar-se com outros atletas da sua região</li>
        <li>Organizar peladas, jogos e competições</li>
        <li>Avaliar e ser avaliado por outros jogadores</li>
        <li>Gerenciar seus esportes favoritos</li>
      </ul>
    </div>
    <div class="text">
      Para começar, complete seu perfil e escolha seus esportes preferidos:
    </div>
    <div style="text-align: center;">
      <a href="{{appUrl}}" class="button">Acessar Arena</a>
    </div>
    <div class="text" style="margin-top: 30px; font-size: 14px; color: #999999;">
      Se precisar de ajuda, nossa equipe está à disposição em <a href="mailto:{{supportEmail}}" style="color: #FF5301;">{{supportEmail}}</a>
    </div>
    <div class="footer">
      &copy; {{year}} Arena SportPulse. Todos os direitos reservados.<br>
      <a href="{{appUrl}}/terms" style="color: #FF5301; text-decoration: none;">Termos de Uso</a> |
      <a href="{{appUrl}}/privacy" style="color: #FF5301; text-decoration: none;">Política de Privacidade</a>
    </div>
  </div>
</body>
</html>
```

#### ✅ MODIFICAR: `src/modules/email/services/email-template-builder.service.ts`
```typescript
// Adicionar métodos:

buildEmailVerificationContext(
  name: string,
  verificationCode: string,
  verificationUrl: string,
): EmailContext {
  return {
    name,
    verificationCode,
    verificationUrl,
    expirationTime: '24 horas',
    year: new Date().getFullYear().toString(),
  };
}

buildWelcomeContext(name: string, appUrl: string): EmailContext {
  return {
    name,
    appUrl,
    supportEmail: this.configService.get<string>('SUPPORT_EMAIL') || 'suporte@arena.com',
    year: new Date().getFullYear().toString(),
  };
}
```

#### ✅ MODIFICAR: `src/modules/email/email.service.ts`
```typescript
// Adicionar métodos:

async sendEmailVerificationEmail(
  params: SendEmailVerificationParams,
): Promise<void> {
  const { email, name, verificationCode, verificationToken } = params;

  const verificationUrl = this.urlBuilderService.buildEmailVerificationUrl(verificationToken);

  const context = this.emailTemplateBuilder.buildEmailVerificationContext(
    name,
    verificationCode,
    verificationUrl,
  );

  const emailData: EmailData = {
    to: email,
    subject: EMAIL_SUBJECTS.EMAIL_VERIFICATION,
    template: './email-verification',
    context,
  };

  try {
    await this.emailSender.sendEmail(emailData);
    this.emailLogger.logSuccess({
      type: EMAIL_TYPES.EMAIL_VERIFICATION,
      to: email,
      subject: emailData.subject,
    });
  } catch (error) {
    this.emailLogger.logError({
      type: EMAIL_TYPES.EMAIL_VERIFICATION,
      to: email,
      error: error.message,
    });
    throw error;
  }
}

async sendWelcomeEmail(params: SendWelcomeEmailParams): Promise<void> {
  const { email, name } = params;

  const appUrl = this.configService.get<string>('FRONTEND_URL');

  const context = this.emailTemplateBuilder.buildWelcomeContext(name, appUrl);

  const emailData: EmailData = {
    to: email,
    subject: EMAIL_SUBJECTS.WELCOME,
    template: './welcome',
    context,
  };

  try {
    await this.emailSender.sendEmail(emailData);
    this.emailLogger.logSuccess({
      type: EMAIL_TYPES.WELCOME,
      to: email,
      subject: emailData.subject,
    });
  } catch (error) {
    this.emailLogger.logError({
      type: EMAIL_TYPES.WELCOME,
      to: email,
      error: error.message,
    });
    throw error;
  }
}
```

#### ✅ CRIAR: Migration para campos de verificação
```bash
cd /Users/felipemoreiralanna/Documents/GitHub/BackSportPulseMobile
npm run migration:generate -- src/database/migrations/AddEmailVerificationFields
```

Conteúdo da migration:
```typescript
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddEmailVerificationFields1234567890123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'emailVerificationToken',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'emailVerificationTokenExpires',
        type: 'timestamp',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'emailVerificationToken');
    await queryRunner.dropColumn('users', 'emailVerificationTokenExpires');
  }
}
```

#### ✅ MODIFICAR: `src/shared/entities/user.entity.ts`
```typescript
// Adicionar campos:

@Column({ nullable: true })
emailVerificationToken?: string;

@Column({ type: 'timestamp', nullable: true })
emailVerificationTokenExpires?: Date;
```

#### ✅ MODIFICAR: `src/auth/auth.service.ts`
```typescript
// No método register(), após criar usuário:

async register(registerDto: RegisterDto): Promise<AuthResponse> {
  // ... código existente de criação de usuário

  // Gerar código de verificação
  const verificationCode = this.generateVerificationCode(6);
  const verificationToken = this.generateVerificationToken();

  user.emailVerificationToken = await bcrypt.hash(verificationToken, 10);
  user.emailVerificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
  await this.userRepository.save(user);

  // Enviar email de verificação
  await this.emailService.sendEmailVerificationEmail({
    email: user.email,
    name: user.firstName,
    verificationCode,
    verificationToken,
  });

  // ... resto do código (gerar token JWT, etc)
}

// Método auxiliar
private generateVerificationCode(length: number): string {
  return Math.floor(Math.random() * Math.pow(10, length))
    .toString()
    .padStart(length, '0');
}

private generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}
```

#### ✅ CRIAR: `src/auth/dto/verify-email.dto.ts`
```typescript
import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty({
    description: 'Código de verificação de 6 dígitos',
    example: '123456',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  code: string;
}

export class ResendVerificationDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@exemplo.com',
  })
  @IsEmail()
  email: string;
}
```

#### ✅ MODIFICAR: `src/auth/auth.controller.ts`
```typescript
// Adicionar endpoints:

@Post('verify-email')
@ApiOperation({ summary: 'Verifica email com código de 6 dígitos' })
@ApiResponse({ status: 200, description: 'Email verificado com sucesso' })
@ApiResponse({ status: 400, description: 'Código inválido ou expirado' })
async verifyEmail(
  @Body() verifyEmailDto: VerifyEmailDto,
  @GetUser() user: User,
): Promise<{ message: string }> {
  await this.authService.verifyEmail(user.id, verifyEmailDto.code);
  return { message: 'Email verificado com sucesso' };
}

@Post('resend-verification')
@ApiOperation({ summary: 'Reenvia email de verificação' })
@ApiResponse({ status: 200, description: 'Email reenviado' })
@ApiResponse({ status: 429, description: 'Limite de tentativas excedido' })
async resendVerification(
  @GetUser() user: User,
): Promise<{ message: string }> {
  await this.authService.resendVerificationEmail(user.id);
  return { message: 'Email de verificação reenviado' };
}
```

#### ✅ MODIFICAR: `src/auth/auth.service.ts`
```typescript
// Adicionar métodos:

async verifyEmail(userId: string, code: string): Promise<void> {
  const user = await this.userRepository.findOne({ where: { id: userId } });

  if (!user) {
    throw new NotFoundException('Usuário não encontrado');
  }

  if (user.isEmailVerified) {
    throw new BadRequestException('Email já verificado');
  }

  if (!user.emailVerificationToken || !user.emailVerificationTokenExpires) {
    throw new BadRequestException('Token de verificação não encontrado');
  }

  if (user.emailVerificationTokenExpires < new Date()) {
    throw new BadRequestException('Código expirado. Solicite um novo código.');
  }

  const isValidCode = await bcrypt.compare(code, user.emailVerificationToken);

  if (!isValidCode) {
    throw new BadRequestException('Código inválido');
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = null;
  user.emailVerificationTokenExpires = null;
  await this.userRepository.save(user);

  // Enviar email de boas-vindas
  await this.emailService.sendWelcomeEmail({
    email: user.email,
    name: user.firstName,
  });
}

async resendVerificationEmail(userId: string): Promise<void> {
  const user = await this.userRepository.findOne({ where: { id: userId } });

  if (!user) {
    throw new NotFoundException('Usuário não encontrado');
  }

  if (user.isEmailVerified) {
    throw new BadRequestException('Email já verificado');
  }

  const verificationCode = this.generateVerificationCode(6);
  const verificationToken = this.generateVerificationToken();

  user.emailVerificationToken = await bcrypt.hash(verificationToken, 10);
  user.emailVerificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await this.userRepository.save(user);

  await this.emailService.sendEmailVerificationEmail({
    email: user.email,
    name: user.firstName,
    verificationCode,
    verificationToken,
  });
}
```

---

## 4. Frontend: Implementação Necessária

### 4.1 Arquivos a Criar

#### ✅ CRIAR: `src/screens/verifyEmailScreen/index.tsx`
```tsx
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ArenaKeyboardAwareScrollView } from '@/components/ui/arenaKeyboardAwareScrollView';
import { OTPInput } from '@/components/ui/otpInput';
import { styles } from './stylesVerifyEmailScreen';
import { useVerifyEmailScreen } from './useVerifyEmailScreen';

export const VerifyEmailScreen: React.FC = () => {
  const {
    code,
    setCode,
    isLoading,
    isResending,
    error,
    timer,
    canResend,
    handleVerifyEmail,
    handleResendCode,
  } = useVerifyEmailScreen();

  return (
    <ArenaKeyboardAwareScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      bottomOffset={60}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="headingPrimary" style={styles.title}>
            Verifique seu email
          </Text>
          <Text variant="bodySecondary" style={styles.subtitle}>
            Enviamos um código de 6 dígitos para o seu email. Digite-o abaixo para continuar.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <OTPInput
            length={6}
            value={code}
            onChange={setCode}
            error={error}
          />
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text variant="errorPrimary">{error}</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button
            variant="primary"
            size="lg"
            onPress={handleVerifyEmail}
            disabled={code.length !== 6 || isLoading}
          >
            {isLoading ? 'Verificando...' : 'Verificar Email'}
          </Button>

          <View style={styles.resendContainer}>
            <Text variant="bodySecondary">Não recebeu o código?</Text>
            {canResend ? (
              <Button
                variant="link"
                onPress={handleResendCode}
                disabled={isResending}
              >
                {isResending ? 'Reenviando...' : 'Reenviar código'}
              </Button>
            ) : (
              <Text variant="bodySecondary">
                Reenviar em {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
              </Text>
            )}
          </View>
        </View>
      </View>
    </ArenaKeyboardAwareScrollView>
  );
};
```

#### ✅ CRIAR: `src/screens/verifyEmailScreen/useVerifyEmailScreen.ts`
```tsx
import { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { authService } from '@/services/auth';
import { useAuth } from '@/contexts/AuthContext';
import type { UseVerifyEmailScreenReturn } from './typesVerifyEmailScreen';

const TIMER_DURATION = 60;
const CODE_LENGTH = 6;

export const useVerifyEmailScreen = (): UseVerifyEmailScreenReturn => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [canResend, setCanResend] = useState(false);

  const navigation = useNavigation();
  const { refreshUser } = useAuth();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, canResend]);

  const handleVerifyEmail = useCallback(async () => {
    if (code.length !== CODE_LENGTH) {
      setError('Código deve ter 6 dígitos');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await authService.verifyEmail(code);
      await refreshUser();
      navigation.navigate('OnboardingSports');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro ao verificar email. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [code, navigation, refreshUser]);

  const handleResendCode = useCallback(async () => {
    setIsResending(true);
    setError(null);

    try {
      await authService.resendVerificationEmail();
      setTimer(TIMER_DURATION);
      setCanResend(false);
      setCode('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro ao reenviar código. Tente novamente.');
      }
    } finally {
      setIsResending(false);
    }
  }, []);

  return {
    code,
    setCode,
    isLoading,
    isResending,
    error,
    timer,
    canResend,
    handleVerifyEmail,
    handleResendCode,
  };
};
```

#### ✅ CRIAR: `src/screens/verifyEmailScreen/typesVerifyEmailScreen.ts`
```tsx
export interface UseVerifyEmailScreenReturn {
  code: string;
  setCode: (code: string) => void;
  isLoading: boolean;
  isResending: boolean;
  error: string | null;
  timer: number;
  canResend: boolean;
  handleVerifyEmail: () => Promise<void>;
  handleResendCode: () => Promise<void>;
}
```

#### ✅ CRIAR: `src/screens/verifyEmailScreen/stylesVerifyEmailScreen.ts`
```tsx
import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing['2xl'],
  },
  container: {
    flex: 1,
    gap: ArenaSpacing.lg,
  },
  header: {
    gap: ArenaSpacing.sm,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  inputContainer: {
    marginVertical: ArenaSpacing.xl,
  },
  errorContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    gap: ArenaSpacing.md,
  },
  resendContainer: {
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
});
```

### 4.2 Arquivos a Modificar

#### ✅ MODIFICAR: `src/navigation/typesNavigation.ts`
```tsx
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  VerifyEmail: { email: string }; // ← ADICIONAR
  ForgotPassword: undefined;
  VerifyCode: VerifyCodeParams;
  ResetPassword: ResetPasswordParams;
  OnboardingSports: undefined;
  MainTabs: undefined;
  // ... outros
};
```

#### ✅ MODIFICAR: `src/navigation/AppNavigator.tsx`
```tsx
import { VerifyEmailScreen } from '@/screens/verifyEmailScreen';

// No Stack Navigator (após RegisterScreen):
<Stack.Screen
  name="VerifyEmail"
  component={VerifyEmailScreen}
  options={{
    title: 'Verificar Email',
    headerShown: true,
  }}
/>
```

#### ✅ MODIFICAR: `src/screens/registerScreen/useRegisterScreen.ts`
```tsx
// No método handleSubmit, após registro bem-sucedido:

const handleSubmit = async () => {
  // ... validações e criação de usuário

  try {
    await authService.register(data);
    const user = await authService.me();

    // Verificar se email precisa ser verificado
    if (!user.isEmailVerified) {
      navigation.navigate('VerifyEmail', { email: data.email });
    } else {
      navigation.navigate('OnboardingSports');
    }
  } catch (error) {
    // ... tratamento de erros
  }
};
```

#### ✅ MODIFICAR: `src/services/auth.ts`
```tsx
// Atualizar métodos existentes:

async verifyEmail(code: string): Promise<{ message: string }> {
  const response = await httpService.post<{ message: string }>(
    '/auth/verify-email',
    { code },
  );
  return response;
}

async resendVerificationEmail(): Promise<{ message: string }> {
  const response = await httpService.post<{ message: string }>(
    '/auth/resend-verification',
  );
  return response;
}
```

#### ✅ MODIFICAR: `app.json`
```json
{
  "expo": {
    "scheme": "arena",
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "data": [
            {
              "scheme": "https",
              "host": "backsportpulsemobile-production.up.railway.app",
              "pathPrefix": "/verify-email"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    },
    "ios": {
      "associatedDomains": [
        "applinks:backsportpulsemobile-production.up.railway.app"
      ]
    }
  }
}
```

---

## 5. Configuração no Brevo

### 5.1 Criar Conta no Brevo

1. Acesse [www.brevo.com](https://www.brevo.com)
2. Clique em "Sign up free" no canto superior direito
3. Preencha o formulário:
   - Email (use seu email corporativo ou pessoal)
   - Senha forte
   - Nome da empresa: "Arena SportPulse" ou "Arena"
4. Confirme seu email (Brevo envia link de confirmação)
5. Complete o onboarding:
   - Tipo de negócio: "Sports & Recreation" ou "Technology"
   - País: Brasil
   - Role: Developer ou Product Owner

### 5.2 Obter API Key

1. Faça login no Brevo
2. No menu lateral esquerdo, clique em **"SMTP & API"**
3. Clique na aba **"API Keys"**
4. Clique no botão **"Generate a new API key"**
5. Preencha:
   - **Name**: `SportPulse Backend Production`
   - **Version**: Selecione `v3`
6. Clique em **"Generate"**
7. **COPIE A API KEY IMEDIATAMENTE** (ela só é exibida uma vez)
   - Formato: `xkeysib-xxxxxxxxxxxxxxxxxxxxxx-yyyyyyyyyyyyyyyy`
8. Salve em local seguro (1Password, .env local, etc.)

### 5.3 Configurar Sender (Remetente)

1. No menu lateral, vá em **"Senders"**
2. Clique em **"Add a new sender"**
3. Preencha:
   - **Email**: `noreply@seudominio.com`
   - **Name**: `Arena SportPulse`
   - **Reply-to email**: `suporte@seudominio.com` (opcional)
4. Clique em **"Save"**

**IMPORTANTE**:
- Se você não tem domínio próprio, pode usar email Gmail/Outlook temporariamente, mas Brevo exigirá verificação (link enviado para o email).
- Para produção, é **essencial** ter domínio próprio com SPF/DKIM configurados.

### 5.4 Verificar Domínio (Produção)

Para produção, você precisa verificar o domínio para evitar emails na spam:

1. No Brevo, vá em **"Senders"** → **"Domains"**
2. Clique em **"Add a domain"**
3. Digite seu domínio: `seudominio.com`
4. Brevo fornecerá 3 registros DNS para adicionar:

**Registros DNS necessários:**

| Tipo | Host | Valor |
|------|------|-------|
| **TXT** | `@` ou raiz | `v=spf1 include:spf.brevo.com ~all` |
| **TXT** | `mail._domainkey` | `k=rsa; p=MIGfMA0GCS...` (chave DKIM fornecida) |
| **CNAME** | `mail` | `mail.brevo.com` |

**Como adicionar (exemplos por provedor):**

- **Cloudflare**: Dashboard → DNS → Add Record
- **GoDaddy**: My Products → DNS → Manage Zones
- **Hostinger**: Hosting → Domain → DNS Zone Editor
- **Vercel/Railway**: Adicionar via painel de domínio

5. Após adicionar os registros, clique em **"Verify authentication"** no Brevo
6. Aguarde até 24h para propagação DNS (geralmente leva 2-6 horas)

### 5.5 Criar Templates no Brevo (Opcional)

Você pode criar templates visuais no Brevo ou usar templates Handlebars do backend:

**Opção A: Templates no Brevo (GUI)**
1. Vá em **"Campaigns"** → **"Email templates"**
2. Clique em **"Create a new template"**
3. Use o drag-and-drop editor
4. Salve template com ID (ex: `template-id: 1`)
5. No backend, referencie por ID ao invés de arquivo `.hbs`

**Opção B: Templates no Backend (Recomendado)**
- Use os arquivos `.hbs` criados na seção 3.3
- Mais flexível e versionável com Git
- Não requer mudanças na UI do Brevo

### 5.6 Configurar Webhooks (Avançado)

Para rastrear eventos de email (abertos, cliques, bounces):

1. No Brevo, vá em **"Transactional"** → **"Settings"** → **"Webhooks"**
2. Clique em **"Add a new webhook"**
3. Preencha:
   - **URL**: `https://seu-backend.com/api/webhooks/brevo`
   - **Events**: Selecione os eventos que deseja rastrear:
     - ✅ `delivered` - Email entregue
     - ✅ `opened` - Email aberto
     - ✅ `click` - Link clicado
     - ✅ `hard_bounce` - Email inválido
     - ✅ `soft_bounce` - Caixa cheia
     - ✅ `spam` - Marcado como spam
4. Clique em **"Save"**

**Backend webhook handler** (criar se necessário):
```typescript
// src/webhooks/brevo-webhook.controller.ts
@Post('brevo')
async handleBrevoWebhook(@Body() payload: any) {
  const { event, email, date } = payload;

  switch (event) {
    case 'delivered':
      // Log entrega
      break;
    case 'opened':
      // Log abertura
      break;
    case 'hard_bounce':
      // Marcar email como inválido no DB
      break;
  }
}
```

### 5.7 Testar Envio de Email

1. No Brevo, vá em **"SMTP & API"** → **"Test your API"**
2. Cole sua API key
3. Clique em **"Test"**
4. Envie email de teste para seu email pessoal
5. Verifique:
   - Email chegou?
   - Não foi para spam?
   - Formatação OK?

### 5.8 Configurar Limites de Envio

O plano gratuito do Brevo tem limites:

- **300 emails/dia** (free tier)
- **Lite Plan** ($25/mês): 10.000 emails/mês
- **Starter Plan** ($39/mês): 20.000 emails/mês + API avançada

**Para monitorar uso:**
1. Dashboard → Aba **"Statistics"**
2. Veja emails enviados hoje/mês
3. Configure alertas:
   - Settings → Notifications → Email Usage Alerts
   - Receba email quando atingir 80% do limite

### 5.9 Checklist Final de Configuração Brevo

- [ ] Conta criada e email confirmado
- [ ] API Key gerada e salva em `.env`
- [ ] Sender configurado (`noreply@seudominio.com`)
- [ ] Domínio verificado (SPF + DKIM + CNAME)
- [ ] Registros DNS propagados (verificar em mxtoolbox.com/dkim.aspx)
- [ ] Template de email de teste enviado com sucesso
- [ ] Webhooks configurados (opcional)
- [ ] Limite de envio monitorado

---

## 6. Plano de Implementação

### Fase 1: Setup e Infraestrutura (2-3 horas)

**Backend**
- [ ] Instalar SDK do Brevo: `npm install @getbrevo/brevo`
- [ ] Criar `BrevoService` em `src/modules/email/brevo/`
- [ ] Atualizar `EmailSenderService` para usar Brevo
- [ ] Adicionar variáveis de ambiente `.env`:
  ```env
  BREVO_API_KEY=sua-api-key-aqui
  BREVO_SENDER_EMAIL=noreply@seudominio.com
  BREVO_SENDER_NAME=Arena SportPulse
  FRONTEND_URL=https://backsportpulsemobile-production.up.railway.app
  EMAIL_VERIFICATION_EXPIRES_IN=24h
  ```
- [ ] Testar envio de email via Brevo (email de reset existente)

**Brevo Dashboard**
- [ ] Criar conta no Brevo
- [ ] Gerar API Key
- [ ] Configurar sender
- [ ] (Opcional) Verificar domínio

### Fase 2: Email de Verificação (3-4 horas)

**Backend**
- [ ] Criar migration `AddEmailVerificationFields`
- [ ] Rodar migration: `npm run migration:run`
- [ ] Atualizar `User` entity com novos campos
- [ ] Criar template `email-verification.hbs`
- [ ] Adicionar método `buildEmailVerificationContext()` no template builder
- [ ] Implementar `sendEmailVerificationEmail()` no EmailService
- [ ] Criar DTOs: `VerifyEmailDto`, `ResendVerificationDto`
- [ ] Implementar `verifyEmail()` e `resendVerificationEmail()` no AuthService
- [ ] Adicionar endpoints no `AuthController`:
  - `POST /auth/verify-email`
  - `POST /auth/resend-verification`
- [ ] Modificar `register()` para enviar email de verificação
- [ ] Testar fluxo completo no Postman/Insomnia

**Frontend**
- [ ] Criar `VerifyEmailScreen` completa
- [ ] Atualizar `typesNavigation.ts` com rota `VerifyEmail`
- [ ] Adicionar tela no `AppNavigator`
- [ ] Modificar `RegisterScreen` para navegar para `VerifyEmail`
- [ ] Atualizar métodos `verifyEmail()` e `resendVerificationEmail()` no authService
- [ ] Testar fluxo de registro → verificação

### Fase 3: Email de Boas-vindas (1-2 horas)

**Backend**
- [ ] Criar template `welcome.hbs`
- [ ] Adicionar método `buildWelcomeContext()` no template builder
- [ ] Implementar `sendWelcomeEmail()` no EmailService
- [ ] Chamar `sendWelcomeEmail()` após verificação bem-sucedida (no `verifyEmail()`)
- [ ] Testar envio de boas-vindas

### Fase 4: Deep Linking (Opcional, 2 horas)

**Frontend**
- [ ] Atualizar `app.json` com intent filter Android
- [ ] Adicionar associated domain iOS
- [ ] Configurar linking config no `AppNavigator`
- [ ] Testar deep link: `arena://verify-email/TOKEN`
- [ ] Testar universal link: `https://backsportpulsemobile-production.up.railway.app/verify-email/TOKEN`

**Backend**
- [ ] Atualizar `buildEmailVerificationUrl()` com domínio correto
- [ ] Incluir URL no template `email-verification.hbs`

### Fase 5: Testes e Refinamentos (2-3 horas)

- [ ] Testar fluxo completo end-to-end:
  1. Registrar novo usuário
  2. Receber email de verificação
  3. Inserir código de 6 dígitos
  4. Receber email de boas-vindas
  5. Navegar para onboarding
- [ ] Testar edge cases:
  - [ ] Código expirado (24h)
  - [ ] Código inválido
  - [ ] Email já verificado
  - [ ] Reenvio de código (cooldown de 60s)
  - [ ] Limite de tentativas (3x)
- [ ] Testar em produção (Railway)
- [ ] Monitorar logs de email no Brevo
- [ ] Verificar se emails não vão para spam

### Fase 6: Documentação e Deploy (1 hora)

- [ ] Documentar variáveis de ambiente necessárias
- [ ] Atualizar README.md com instruções de setup Brevo
- [ ] Criar PR com todas as mudanças
- [ ] Fazer code review
- [ ] Merge e deploy para produção
- [ ] Monitorar emails enviados no dashboard Brevo

---

## 7. Checklist de Deploy

### Pré-Deploy

**Backend**
- [ ] Todas as migrations rodadas em desenvolvimento
- [ ] Testes de unidade criados para EmailService
- [ ] Variáveis de ambiente `.env` configuradas corretamente
- [ ] API Key do Brevo válida e testada
- [ ] Templates `.hbs` revisados (sem erros de sintaxe)
- [ ] Endpoints de email documentados no Swagger

**Frontend**
- [ ] Tela `VerifyEmailScreen` testada em iOS e Android
- [ ] Navegação funcionando (Register → VerifyEmail → Onboarding)
- [ ] Tratamento de erros implementado
- [ ] Loading states em todos os botões
- [ ] Mensagens de erro amigáveis

**Brevo**
- [ ] Conta criada e verificada
- [ ] API Key gerada e salva
- [ ] Sender configurado
- [ ] Domínio verificado (se aplicável)
- [ ] Email de teste enviado com sucesso

### Deploy Backend (Railway)

1. **Adicionar variáveis de ambiente no Railway:**
   ```env
   BREVO_API_KEY=xkeysib-...
   BREVO_SENDER_EMAIL=noreply@seudominio.com
   BREVO_SENDER_NAME=Arena SportPulse
   FRONTEND_URL=https://seu-frontend.com
   EMAIL_VERIFICATION_EXPIRES_IN=24h
   ```

2. **Rodar migrations em produção:**
   ```bash
   railway run npm run migration:run
   ```

3. **Deploy:**
   ```bash
   git push origin main
   # Railway faz deploy automático
   ```

4. **Verificar logs:**
   ```bash
   railway logs
   # Procurar por "Email enviado via Brevo" ou erros
   ```

### Deploy Frontend (Expo)

1. **Build de produção:**
   ```bash
   npx expo build:android
   npx expo build:ios
   ```

2. **Atualizar OTA (sem rebuild):**
   ```bash
   npx expo publish
   ```

3. **Testar em dispositivo real:**
   - Instalar build de produção
   - Criar nova conta
   - Verificar email

### Pós-Deploy

- [ ] Criar conta de teste em produção
- [ ] Verificar email de verificação chegou
- [ ] Inserir código e verificar
- [ ] Confirmar email de boas-vindas chegou
- [ ] Verificar campo `isEmailVerified: true` no banco
- [ ] Monitorar dashboard Brevo por 24h
- [ ] Verificar taxa de entrega (deve ser >95%)
- [ ] Verificar se emails não vão para spam
- [ ] Configurar alertas de uso no Brevo

---

## 8. Troubleshooting Comum

### Emails não chegam

**Possíveis causas:**
1. API Key inválida ou expirada
2. Sender não verificado
3. Domínio sem SPF/DKIM
4. Limite de envio atingido (300/dia no free tier)
5. Email destinatário inválido

**Soluções:**
- Verificar logs do backend: `railway logs | grep "Brevo"`
- Verificar dashboard Brevo: Statistics → Recent Activity
- Testar com email pessoal primeiro (Gmail, Outlook)
- Verificar status do domínio no Brevo

### Emails vão para spam

**Possíveis causas:**
1. Domínio não verificado
2. SPF/DKIM não configurados
3. Conteúdo do email com palavras spam
4. Taxa de bounce alta

**Soluções:**
- Configurar SPF: `v=spf1 include:spf.brevo.com ~all`
- Configurar DKIM no Brevo
- Adicionar link de unsubscribe (exigido por lei)
- Evitar palavras como "grátis", "promoção", "urgente"
- Testar com [Mail Tester](https://www.mail-tester.com)

### Deep linking não funciona

**Possíveis causas:**
1. Intent filter Android não configurado
2. Associated domain iOS não verificado
3. URL scheme incorreta
4. App não instalado

**Soluções:**
- Verificar `app.json` tem scheme `arena://`
- Testar com `npx uri-scheme open arena://verify-email/TOKEN --android`
- Verificar Apple App Site Association (AASA) file
- Usar fallback para código de 6 dígitos

### Código de verificação expirado

**Possíveis causas:**
1. User demorou >24h para verificar
2. Timezone do servidor incorreto

**Soluções:**
- Implementar botão "Reenviar código"
- Estender expiração para 48h se necessário
- Verificar timezone: `date` no servidor deve estar correto

---

## 9. Recursos e Referências

### Documentação Oficial
- [Brevo API Docs](https://developers.brevo.com/docs)
- [Brevo Node.js SDK](https://github.com/getbrevo/brevo-node)
- [NestJS Mailer Module](https://nest-modules.github.io/mailer/)
- [Handlebars Templates](https://handlebarsjs.com/)

### Ferramentas Úteis
- [Mail Tester](https://www.mail-tester.com) - Testar score de spam
- [MX Toolbox](https://mxtoolbox.com) - Verificar DNS/SPF/DKIM
- [Temp Mail](https://temp-mail.org) - Emails temporários para teste
- [Mailtrap](https://mailtrap.io) - Sandbox de email (alternativa)

### Códigos de Exemplo
- Templates HTML: Ver `src/modules/email/templates/` no backend
- Testes de email: Ver `__tests__/email.service.spec.ts`

---

## 10. Estimativa de Tempo Total

| Fase | Tempo Estimado | Prioridade |
|------|----------------|------------|
| Fase 1: Setup Brevo | 2-3 horas | 🔴 Crítica |
| Fase 2: Email Verificação | 3-4 horas | 🔴 Crítica |
| Fase 3: Email Boas-vindas | 1-2 horas | 🟡 Alta |
| Fase 4: Deep Linking | 2 horas | 🟢 Média |
| Fase 5: Testes | 2-3 horas | 🔴 Crítica |
| Fase 6: Deploy | 1 hora | 🔴 Crítica |
| **TOTAL** | **11-15 horas** | - |

**Recomendação:** Implementar em sprints de 4 horas, testando após cada fase.

---

## 11. Próximos Passos

Após completar esta integração, considere implementar:

1. **Email de Evento:**
   - Convite para evento
   - Lembrete de evento (24h antes)
   - Confirmação de participação

2. **Email de Feedback:**
   - Solicitar avaliação pós-evento
   - Net Promoter Score (NPS)

3. **Email de Re-engajamento:**
   - User inativo há 30 dias
   - Novidades e updates

4. **Email Transacional:**
   - Mudança de senha
   - Atualização de perfil
   - Exclusão de conta

5. **Analytics de Email:**
   - Taxa de abertura
   - Taxa de cliques
   - Conversão por tipo de email

---

**Criado em:** 2025-12-08
**Última atualização:** 2025-12-08
**Versão:** 1.0
**Autor:** Claude Code (Anthropic)
