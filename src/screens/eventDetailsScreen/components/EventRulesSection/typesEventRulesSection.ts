/**
 * Props do componente EventRulesSection
 */
export interface EventRulesSectionProps {
  /**
   * String com regras do evento (separadas por quebra de linha ou ponto final)
   * @example "Proibido fumar. Respeitar os demais participantes. Chegar 15 minutos antes."
   */
  rules: string;

  /**
   * ID para testes
   * @optional
   */
  testID?: string;
}
