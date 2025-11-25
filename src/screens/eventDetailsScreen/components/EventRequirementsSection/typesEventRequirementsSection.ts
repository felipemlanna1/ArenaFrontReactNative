/**
 * Props do componente EventRequirementsSection
 */
export interface EventRequirementsSectionProps {
  /**
   * String com requisitos do evento (separados por quebra de linha ou vírgula)
   * @example "Trazer água, Protetor solar, Chuteira"
   */
  requirements: string;

  /**
   * ID para testes
   * @optional
   */
  testID?: string;
}
