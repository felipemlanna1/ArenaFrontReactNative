import React from 'react';
import { View } from 'react-native';
import { Label } from '@/components/ui/label';
import { ShowcaseItem } from '../showcaseItem';
import { ArenaSpacing } from '@/constants';

export const LabelSection: React.FC = () => {
  return (
    <>
      <ShowcaseItem label="Form Label (Padrão para campos)">
        <View style={{ gap: ArenaSpacing.lg }}>
          <Label variant="form">Nome completo</Label>
          <Label variant="form" required>
            Email (obrigatório)
          </Label>
          <Label variant="form" disabled>
            Campo desabilitado
          </Label>
        </View>
      </ShowcaseItem>

      <ShowcaseItem label="Section Label (Headings de seção)">
        <View style={{ gap: ArenaSpacing.lg }}>
          <Label variant="section">Informações básicas</Label>
          <Label variant="section" required>
            Dados obrigatórios
          </Label>
        </View>
      </ShowcaseItem>

      <ShowcaseItem label="Inline Label (Switch, Checkbox)">
        <View style={{ gap: ArenaSpacing.lg }}>
          <Label variant="inline">Notificações ativas</Label>
          <Label variant="inline">Lembrar de mim</Label>
          <Label variant="inline" disabled>
            Opção desabilitada
          </Label>
        </View>
      </ShowcaseItem>

      <ShowcaseItem label="Helper Label (Texto auxiliar)">
        <View style={{ gap: ArenaSpacing.lg }}>
          <Label variant="helper">Mínimo 8 caracteres</Label>
          <Label variant="helper">Escolha uma opção da lista</Label>
          <Label variant="helper">
            Este campo é opcional mas recomendado
          </Label>
        </View>
      </ShowcaseItem>

      <ShowcaseItem label="Size Override (Tamanhos customizados)">
        <View style={{ gap: ArenaSpacing.lg }}>
          <Label variant="form" size="xs">
            Extra pequeno (xs)
          </Label>
          <Label variant="form" size="sm">
            Pequeno (sm) - padrão
          </Label>
          <Label variant="form" size="md">
            Médio (md)
          </Label>
          <Label variant="form" size="lg">
            Grande (lg)
          </Label>
        </View>
      </ShowcaseItem>
    </>
  );
};
