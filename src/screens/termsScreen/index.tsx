import React from 'react';
import { View, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { AppLayout } from '@/components/AppLayout';
import { ArenaColors } from '@/constants';
import { styles } from './stylesTermsScreen';
import { TermsScreenProps } from './typesTermsScreen';

export const TermsScreen: React.FC<TermsScreenProps> = () => {
  return (
    <AppLayout showHeader={false}>
      <ScrollView
        contentContainerStyle={styles.container}
        testID="terms-screen"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Ionicons
            name="document-text-outline"
            size={64}
            color={ArenaColors.brand.primary}
          />

          <Text variant="headingPrimary" style={styles.title}>
            Termos de Uso
          </Text>

          <Text variant="captionSecondary" style={styles.date}>
            Última atualização: 2 de dezembro de 2025
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Bem-vindo ao Arena! Estes Termos de Uso regem o seu acesso e
            utilização do aplicativo Arena, uma plataforma mobile de rede social
            esportiva que conecta pessoas através de eventos e atividades
            esportivas.
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Ao criar uma conta ou utilizar nossos serviços, você concorda
            integralmente com estes Termos, nossa Política de Privacidade e demais
            políticas aqui mencionadas. Caso não concorde, por favor, não utilize
            o Arena.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            1. Definições
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Para facilitar a compreensão destes Termos: Arena (nós, nos, nosso)
            refere-se ao aplicativo e à empresa operadora; Usuário (você, seu)
            refere-se a qualquer pessoa que utiliza os serviços; Serviços incluem
            todas as funcionalidades do Arena (perfil, eventos, grupos, avaliações,
            conexões sociais); Conteúdo do Usuário é qualquer informação que você
            publica; Evento é qualquer atividade esportiva criada por usuários;
            Grupo são comunidades esportivas organizadas por usuários.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            2. Descrição dos Serviços
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            O Arena oferece: criação e personalização de perfil esportivo; criação,
            descoberta e participação em eventos de diversas modalidades; criação e
            participação em grupos públicos ou privados; conexão com amigos e
            interação social; sistema de avaliações para construção de reputação; e
            exploração de eventos e pessoas próximas baseada em localização.
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            O Arena atua exclusivamente como intermediário tecnológico. Não
            organizamos, gerenciamos ou supervisionamos fisicamente os eventos
            realizados.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            3. Elegibilidade e Criação de Conta
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Você deve ter no mínimo 16 anos de idade para criar uma conta.
            Menores de 18 anos devem ter autorização de pais ou responsáveis.
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Ao criar sua conta, você concorda em: fornecer informações verdadeiras
            e completas; manter suas informações atualizadas; criar apenas uma
            conta pessoal; não compartilhar sua conta; não criar contas falsas; e
            ser responsável por todas as atividades em sua conta. Você é
            responsável por manter a confidencialidade de suas credenciais de
            login.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            4. Regras de Uso e Conduta
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Você concorda em utilizar o Arena exclusivamente para conectar-se com
            pessoas interessadas em atividades esportivas, organizar eventos
            recreativos, compartilhar experiências e construir comunidades
            saudáveis.
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            É proibido: publicar conteúdo ilegal, ofensivo ou discriminatório;
            assediar ou intimidar outros usuários; criar eventos falsos; cancelar
            eventos recorrentemente; usar o app para fins comerciais não
            autorizados ou spam; coletar dados de usuários; violar direitos de
            propriedade intelectual; usar recursos automatizados (bots); tentar
            comprometer a segurança; publicar avaliações falsas; criar múltiplas
            contas; promover atividades ilícitas; ou usar a plataforma para
            relacionamentos amorosos.
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Violações podem resultar em advertência, suspensão temporária, exclusão
            permanente da conta, ou responsabilização civil e criminal.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            5. Criação e Participação em Eventos
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Como organizador, você é responsável por: fornecer informações
            precisas; garantir que o local seja adequado e seguro; comunicar custos
            claramente; gerenciar participantes; cancelar com antecedência razoável
            (mínimo 2 horas); cumprir leis locais; e garantir que o evento não
            viole direitos de terceiros.
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Como participante, você concorda em: comparecer ou avisar em caso de
            ausência; respeitar as regras; comportar-se de forma respeitosa; levar
            equipamentos adequados; e pagar eventuais custos.
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            IMPORTANTE: O Arena NÃO é responsável por veracidade de informações,
            condições dos locais, comportamento de usuários, cancelamentos, coleta
            de pagamentos, ou qualquer dano decorrente de participação em eventos.
            Você participa por sua conta e risco.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            6. Grupos Esportivos
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Usuários podem criar grupos públicos ou privados. O criador é
            responsável por definir regras, moderar conteúdos e membros, e garantir
            que o grupo não seja usado para fins ilícitos. Ao ingressar em um
            grupo, você concorda em respeitar as regras e contribuir de forma
            construtiva. Administradores podem remover membros que violem regras. O
            Arena pode desativar grupos que violem estes Termos.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            7. Sistema de Avaliações
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            O sistema de avaliações permite que participantes avaliem uns aos
            outros após eventos. Avaliações devem ser honestas, respeitosas e
            relacionadas ao comportamento durante o evento.
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            É proibido: publicar avaliações falsas; avaliar negativamente por
            motivos discriminatórios; criar múltiplas contas para manipular
            avaliações; ou oferecer incentivos por avaliações. O Arena pode remover
            avaliações que violem estas regras.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            8. Conteúdo do Usuário
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Você mantém a propriedade de todo conteúdo que publica. Entretanto, ao
            publicar, você concede ao Arena uma licença mundial, não exclusiva e
            gratuita para usar, reproduzir, modificar, distribuir e exibir seu
            conteúdo em conexão com os Serviços e para fins de marketing. Esta
            licença permanece válida mesmo após exclusão de sua conta, se o
            conteúdo foi compartilhado por outros.
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Você é inteiramente responsável por todo conteúdo publicado. Seguindo o
            Marco Civil da Internet (Lei 12.965/2014), o Arena não monitora
            preventivamente conteúdo, mas removerá conteúdo ilícito mediante
            notificação judicial ou que viole manifestamente estes Termos.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            9. Propriedade Intelectual
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Todo o conteúdo da plataforma Arena (marca, logotipo, design, código)
            são de propriedade exclusiva do Arena, protegidos por leis de
            propriedade intelectual. É proibido copiar, modificar, fazer engenharia
            reversa, ou remover avisos de direitos autorais.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            10. Privacidade e Proteção de Dados
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            O Arena está comprometido com a proteção de seus dados pessoais, em
            conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei
            13.709/2018). Nossa Política de Privacidade descreve detalhadamente
            nossa coleta e uso de dados.
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Você tem direito a confirmar tratamento de dados, acessar, corrigir,
            solicitar eliminação, revogar consentimento e portabilidade de dados.
            Para exercer seus direitos, entre em contato através de:
            legal@arena.app.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            11. Assunção de Riscos e Responsabilidade
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            ATENÇÃO: Atividades esportivas envolvem riscos inerentes, incluindo
            lesões físicas, riscos cardiovasculares, colisões, condições climáticas
            adversas e superfícies irregulares. Ao participar de eventos, você
            reconhece e aceita voluntariamente esses riscos.
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Você declara estar em condições físicas adequadas, não possuir
            restrições médicas, ter consultado profissional de saúde quando
            apropriado, e utilizar equipamentos de proteção adequados.
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            NA MÁXIMA EXTENSÃO PERMITIDA PELA LEI, O ARENA NÃO SERÁ RESPONSÁVEL POR
            lesões, acidentes ou danos decorrentes de eventos; atos de organizadores
            ou participantes; condições dos locais; roubo ou perda de pertences; ou
            qualquer dano direto, indireto ou consequencial.
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Os Serviços são fornecidos no estado em que se encontram, sem garantias
            de que serão ininterruptos, seguros ou livres de erros.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            12. Indenização
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Você concorda em indenizar e isentar o Arena de quaisquer
            reivindicações, danos, perdas e custos (incluindo honorários) decorrentes
            de: seu uso da plataforma; violação destes Termos; violação de direitos
            de terceiros; conteúdo publicado; eventos organizados ou dos quais
            participou; ou seu comportamento em relação a outros usuários.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            13. Pagamentos e Reembolsos
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Atualmente, o Arena é oferecido gratuitamente. Não cobramos taxas de
            assinatura ou acesso aos Serviços básicos.
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            O Arena não gerencia, processa ou intermedia pagamentos entre usuários
            relacionados a custos de eventos ou grupos. Transações financeiras
            entre usuários são de responsabilidade exclusiva dos envolvidos. O
            Arena não se responsabiliza por disputas, inadimplência ou fraudes.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            14. Suspensão e Cancelamento de Conta
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Podemos suspender ou encerrar sua conta imediatamente se você violar
            estes Termos, houver suspeita de fraude, recebermos solicitação de
            autoridade judicial, sua conta permanecer inativa por mais de 24 meses,
            ou identificarmos comportamento prejudicial à comunidade.
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Você pode cancelar sua conta a qualquer momento através das
            configurações do aplicativo ou entrando em contato conosco. Após
            cancelamento: você perderá acesso à plataforma; conteúdo privado será
            excluído em 30 dias; conteúdo público poderá permanecer anonimizado;
            eventos futuros serão cancelados; e você permanecerá responsável por
            obrigações anteriores.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            15. Alterações nos Termos de Uso
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            O Arena se reserva o direito de modificar estes Termos a qualquer
            momento. Alterações entrarão em vigor imediatamente após publicação.
            Notificaremos usuários sobre alterações significativas através de
            notificação no aplicativo ou email. Seu uso continuado após alterações
            constitui aceitação dos novos Termos. Caso não concorde, você deve
            encerrar sua conta.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            16. Lei Aplicável e Resolução de Disputas
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Estes Termos são regidos pelas leis da República Federativa do Brasil,
            incluindo: Código Civil (Lei 10.406/2002), Código de Defesa do
            Consumidor (Lei 8.078/1990), Marco Civil da Internet (Lei
            12.965/2014), e Lei Geral de Proteção de Dados (Lei 13.709/2018).
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Incentivamos que disputas sejam resolvidas de forma amigável. Entre em
            contato através de legal@arena.app antes de iniciar qualquer
            procedimento judicial. Em caso de litígio, as partes elegem o foro da
            Comarca de domicílio do usuário como competente.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            17. Disposições Gerais
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Se qualquer disposição destes Termos for considerada inválida, as
            demais permanecerão em vigor. A falha do Arena em exercer qualquer
            direito não constituirá renúncia. Estes Termos, juntamente com a
            Política de Privacidade, constituem o acordo integral entre você e o
            Arena. Você não pode transferir seus direitos sem nosso consentimento.
            O Arena pode ceder livremente estes Termos. Nada cria relação de
            sociedade ou emprego entre você e o Arena.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            18. Contato
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Para dúvidas, solicitações ou comunicações relacionadas a estes Termos
            de Uso:
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Email: legal@arena.app
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Dados de Proteção de Dados (LGPD): privacy@arena.app
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Suporte técnico: support@arena.app
          </Text>
        </View>

        <View style={styles.footer}>
          <Text variant="captionSecondary" style={styles.footerText}>
            Ao criar uma conta ou utilizar os Serviços do Arena, você declara que
            leu, compreendeu e concorda integralmente com estes Termos de Uso e
            nossa Política de Privacidade, tem capacidade legal para firmar este
            acordo, aceita os riscos inerentes a atividades esportivas, e
            compromete-se a utilizar a plataforma de forma responsável, ética e
            respeitosa.
          </Text>
          <Text variant="bodyPrimary" style={styles.email}>
            legal@arena.app
          </Text>
        </View>
      </ScrollView>
    </AppLayout>
  );
};
