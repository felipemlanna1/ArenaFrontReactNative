import React from 'react';
import { View, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { AppLayout } from '@/components/AppLayout';
import { ArenaColors } from '@/constants';
import { styles } from './stylesPrivacyPolicyScreen';
import { PrivacyPolicyScreenProps } from './typesPrivacyPolicyScreen';

export const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = () => {
  return (
    <AppLayout showHeader={false}>
      <ScrollView
        contentContainerStyle={styles.container}
        testID="privacy-policy-screen"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Ionicons
            name="shield-checkmark-outline"
            size={64}
            color={ArenaColors.brand.primary}
          />

          <Text variant="headingPrimary" style={styles.title}>
            Política de Privacidade
          </Text>

          <Text variant="captionSecondary" style={styles.date}>
            Última atualização: 2 de dezembro de 2025
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            1. Introdução e Compromisso com Sua Privacidade
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Bem-vindo ao Arena, a plataforma que conecta pessoas apaixonadas por
            esportes. Esta Política de Privacidade explica de forma clara e
            transparente como coletamos, usamos, armazenamos, compartilhamos e
            protegemos seus dados pessoais, em total conformidade com a Lei
            Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Arena é o controlador dos seus dados pessoais, o que significa que
            somos responsáveis por decidir como e por que seus dados são
            processados. Levamos a sério nosso compromisso com sua privacidade e
            segurança.
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Ao utilizar o Arena, você concorda com as práticas descritas nesta
            política. Se você não concordar com qualquer parte desta política,
            solicitamos que não utilize nossos serviços.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            2. Definições Importantes
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Para facilitar o entendimento desta política, utilizamos os seguintes
            termos conforme definidos pela LGPD:
          </Text>
          <Text variant="bodySecondary" style={styles.listItem} selectable>
            • Dados Pessoais: Informação relacionada a pessoa natural identificada
            ou identificável (ex: nome, email, CPF, localização).
          </Text>
          <Text variant="bodySecondary" style={styles.listItem} selectable>
            • Dados Pessoais Sensíveis: Dados sobre origem racial ou étnica,
            convicção religiosa, opinião política, filiação a sindicato, dado
            referente à saúde ou à vida sexual, dado genético ou biométrico.
          </Text>
          <Text variant="bodySecondary" style={styles.listItem} selectable>
            • Titular: Você, pessoa natural a quem se referem os dados pessoais.
          </Text>
          <Text variant="bodySecondary" style={styles.listItem} selectable>
            • Tratamento: Toda operação realizada com dados pessoais (coleta,
            armazenamento, uso, compartilhamento, exclusão, etc.).
          </Text>
          <Text variant="bodySecondary" style={styles.listItem} selectable>
            • Controlador: Arena, responsável pelas decisões sobre o tratamento de
            dados pessoais.
          </Text>
          <Text variant="bodySecondary" style={styles.listItem} selectable>
            • Encarregado (DPO): Pessoa responsável por atuar como canal de
            comunicação entre o Arena, os titulares e a ANPD.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            3. Dados Pessoais que Coletamos
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            O Arena coleta diferentes tipos de dados pessoais para fornecer,
            manter e melhorar nossos serviços. Coletamos apenas os dados
            necessários e relevantes para as finalidades informadas.
          </Text>

          <Text variant="titleSecondary" style={styles.subsectionTitle}>
            3.1. Dados de Cadastro e Perfil
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Quando você cria uma conta no Arena, coletamos: nome completo, email,
            telefone, data de nascimento, gênero, biografia, foto de perfil,
            cidade/estado/país, e configurações de privacidade.
          </Text>

          <Text variant="titleSecondary" style={styles.subsectionTitle}>
            3.2. Dados de Esportes e Atividades
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Para personalizar sua experiência: esportes favoritos, nível de
            habilidade, histórico de participação em eventos, estatísticas, e
            avaliações recebidas/dadas.
          </Text>

          <Text variant="titleSecondary" style={styles.subsectionTitle}>
            3.3. Dados de Localização
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Com sua permissão explícita: coordenadas GPS (latitude e longitude)
            para mostrar eventos próximos, endereços salvos, e distância
            calculada entre você e eventos. A coleta de dados de localização
            sempre requer sua autorização prévia nas configurações do dispositivo.
          </Text>

          <Text variant="titleSecondary" style={styles.subsectionTitle}>
            3.4. Dados de Eventos e Grupos
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Quando você cria ou participa: informações de eventos (título,
            descrição, localização, data), status de participação, grupos
            (membros, regras), e convites.
          </Text>

          <Text variant="titleSecondary" style={styles.subsectionTitle}>
            3.5. Dados de Uso e Comportamento
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Para melhorar nossos serviços: páginas visitadas, recursos utilizados,
            tempo de uso, preferências, e feedback sobre o app.
          </Text>

          <Text variant="titleSecondary" style={styles.subsectionTitle}>
            3.6. Dados de Dispositivo e Técnicos
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Coletados automaticamente: modelo do dispositivo, sistema operacional,
            ID único do dispositivo, endereço IP, logs de acesso, e dados de rede.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            4. Como Coletamos Seus Dados
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Coletamos seus dados através de: (1) Informações que você fornece
            diretamente ao criar perfil, eventos ou interagir com usuários; (2)
            Informações coletadas automaticamente através de analytics, dados
            técnicos e localização (com sua autorização); (3) Informações de
            terceiros como login social (Google, Apple, Facebook) e serviços de
            mapas.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            5. Finalidades e Base Legal do Tratamento
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Tratamos seus dados pessoais com base nas seguintes bases legais
            previstas na LGPD (Art. 7º):
          </Text>

          <Text variant="bodySecondary" style={styles.listItem} selectable>
            • Execução de Contrato (Art. 7º, V): Para fornecer os serviços do
            Arena, criar sua conta, processar eventos e conexões sociais.
          </Text>
          <Text variant="bodySecondary" style={styles.listItem} selectable>
            • Consentimento (Art. 7º, I): Para acesso à localização GPS,
            câmera/galeria, notificações push e comunicações de marketing. Você
            pode revogar seu consentimento a qualquer momento.
          </Text>
          <Text variant="bodySecondary" style={styles.listItem} selectable>
            • Legítimo Interesse (Art. 7º, IX): Para melhorar sua experiência,
            desenvolver novos recursos, realizar análises de uso e prevenir
            fraudes.
          </Text>
          <Text variant="bodySecondary" style={styles.listItem} selectable>
            • Cumprimento de Obrigação Legal (Art. 7º, II): Quando necessário para
            atender requisições de autoridades e cumprir leis aplicáveis.
          </Text>
          <Text variant="bodySecondary" style={styles.listItem} selectable>
            • Exercício Regular de Direitos (Art. 7º, VI): Para defender-nos em
            processos e proteger a segurança da plataforma.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            6. Compartilhamento de Dados
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            O Arena NÃO vende seus dados pessoais. Compartilhamos seus dados
            apenas nas seguintes situações:
          </Text>

          <Text variant="titleSecondary" style={styles.subsectionTitle}>
            6.1. Com Outros Usuários do Arena
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Dependendo das suas configurações de privacidade, informações do seu
            perfil podem ser visíveis para outros usuários. Perfil público:
            informações são visíveis para todos. Perfil privado: apenas amigos
            podem ver.
          </Text>

          <Text variant="titleSecondary" style={styles.subsectionTitle}>
            6.2. Com Prestadores de Serviços
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Compartilhamos dados com empresas que nos ajudam a operar o Arena:
            hospedagem em nuvem, analytics, mapas/geolocalização, armazenamento de
            imagens e notificações push. Todos são contratualmente obrigados a
            proteger seus dados.
          </Text>

          <Text variant="titleSecondary" style={styles.subsectionTitle}>
            6.3. Com Autoridades
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Podemos divulgar seus dados quando obrigatório por lei, necessário
            para proteger direitos ou prevenir fraudes, ou em caso de fusão ou
            aquisição.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            7. Transferência Internacional de Dados
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Alguns prestadores de serviços podem estar localizados fora do Brasil.
            Garantimos que a transferência ocorre conforme o Capítulo V da LGPD
            (Art. 33), utilizando apenas prestadores que oferecem nível adequado
            de proteção de dados e implementando cláusulas contratuais padrão.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            8. Segurança dos Dados
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Levamos a segurança dos seus dados muito a sério. Implementamos
            medidas técnicas apropriadas: criptografia de dados em trânsito
            (HTTPS/TLS) e em repouso (AES-256), controle de acesso, firewalls,
            monitoramento contínuo e backup regular.
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Nenhum sistema é 100% seguro. Embora nos esforcemos para proteger seus
            dados, não podemos garantir segurança absoluta. Você também é
            responsável por proteger suas credenciais de acesso.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            9. Retenção de Dados
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Mantemos seus dados pessoais apenas pelo tempo necessário. Conta
            ativa: mantemos enquanto sua conta estiver ativa. Após exclusão:
            dados de perfil excluídos em até 30 dias, dados de eventos
            anonimizados, logs técnicos retidos por até 6 meses, e dados para
            cumprimento legal retidos pelo prazo exigido por lei.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            10. Seus Direitos como Titular (Art. 18 LGPD)
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            A LGPD garante diversos direitos a você como titular de dados
            pessoais. Você pode exercer os seguintes direitos a qualquer momento:
          </Text>

          <Text variant="bodySecondary" style={styles.listItem} selectable>
            • Confirmação e Acesso: Saber se tratamos seus dados e receber cópia
            completa.
          </Text>
          <Text variant="bodySecondary" style={styles.listItem} selectable>
            • Correção: Atualizar dados incompletos ou desatualizados.
          </Text>
          <Text variant="bodySecondary" style={styles.listItem} selectable>
            • Anonimização, Bloqueio ou Eliminação: Tornar dados não
            identificáveis, suspender tratamento ou eliminar dados.
          </Text>
          <Text variant="bodySecondary" style={styles.listItem} selectable>
            • Portabilidade: Receber seus dados em formato estruturado (CSV, JSON)
            para transferir a outro prestador.
          </Text>
          <Text variant="bodySecondary" style={styles.listItem} selectable>
            • Informação sobre Compartilhamento: Saber com quais entidades
            compartilhamos seus dados.
          </Text>
          <Text variant="bodySecondary" style={styles.listItem} selectable>
            • Revogação do Consentimento: Retirar seu consentimento a qualquer
            momento (ex: desativar acesso à localização).
          </Text>
          <Text variant="bodySecondary" style={styles.listItem} selectable>
            • Oposição: Contestar tratamento realizado com base em legítimo
            interesse.
          </Text>
          <Text variant="bodySecondary" style={styles.listItem} selectable>
            • Revisão de Decisões Automatizadas: Solicitar revisão humana de
            decisões automáticas.
          </Text>

          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Para exercer seus direitos, acesse Configurações no app ou envie email
            para privacy@arena.app ou dpo@arena.app. Prazo de resposta: até 15
            dias corridos.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            11. Privacidade de Crianças e Adolescentes
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            O Arena é destinado a usuários com 18 anos ou mais. Não coletamos
            intencionalmente dados de menores de 18 anos sem consentimento dos
            pais ou responsáveis legais, conforme exigido pela LGPD (Art. 14) e
            pelo ECA Digital. Se tomarmos conhecimento de coleta de dados de
            menores sem autorização, excluiremos imediatamente.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            12. Cookies e Tecnologias Similares
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Utilizamos cookies e tecnologias similares para melhorar sua
            experiência: cookies essenciais (necessários para funcionamento),
            cookies de performance (analytics), e cookies de funcionalidade
            (preferências). Você pode gerenciar cookies nas configurações do app
            ou navegador.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            13. Marketing e Comunicações
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Podemos enviar comunicações transacionais (confirmações de eventos,
            convites) que são essenciais e não podem ser desativadas, e
            comunicações promocionais (novos recursos, eventos recomendados) que
            requerem seu consentimento. Você pode gerenciar notificações nas
            configurações do dispositivo ou descadastrar-se de emails promocionais.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            14. Links para Sites de Terceiros
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            O Arena pode conter links para sites de terceiros. Esta Política de
            Privacidade não se aplica a esses sites. Recomendamos que você leia as
            políticas de privacidade de sites de terceiros. Não somos responsáveis
            pelas práticas de privacidade de terceiros.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            15. Alterações nesta Política
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Podemos atualizar esta Política periodicamente para refletir mudanças
            em nossas práticas ou na legislação. Alterações significativas serão
            notificadas por email ou notificação no app com pelo menos 15 dias de
            antecedência. Seu uso continuado do Arena após alterações constitui
            aceitação da política atualizada.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            16. Legislação e Foro
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Esta Política é regida pelas leis brasileiras: Lei Geral de Proteção
            de Dados (LGPD - Lei 13.709/2018), Marco Civil da Internet (Lei
            12.965/2014), Código de Defesa do Consumidor (Lei 8.078/1990) e
            Estatuto da Criança e do Adolescente (ECA - Lei 8.069/1990).
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            17. Autoridade Nacional de Proteção de Dados
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Você tem o direito de apresentar reclamações à Autoridade Nacional de
            Proteção de Dados (ANPD) caso entenda que o tratamento de seus dados
            viola a LGPD. Website: www.gov.br/anpd/pt-br. Encorajamos você a
            entrar em contato conosco primeiro para resolver preocupações
            diretamente.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            18. Contato e Encarregado de Dados (DPO)
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Para exercer seus direitos, esclarecer dúvidas ou enviar reclamações
            sobre tratamento de dados, entre em contato com nosso Encarregado de
            Proteção de Dados (DPO):
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Email: dpo@arena.app ou privacy@arena.app
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Prazo de resposta: Até 15 dias corridos a partir do recebimento da sua
            solicitação, conforme Art. 19 da LGPD.
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titlePrimary" style={styles.sectionTitle}>
            19. Consentimento e Aceitação
          </Text>
          <Text variant="bodySecondary" style={styles.paragraph} selectable>
            Ao criar uma conta e utilizar o Arena, você declara que: leu e
            compreendeu esta Política de Privacidade, concorda com a coleta, uso,
            armazenamento e compartilhamento de seus dados conforme descrito, tem
            18 anos ou mais (ou possui autorização de responsável legal), e
            forneceu informações verdadeiras e precisas.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text variant="captionSecondary" style={styles.footerText}>
            Para dúvidas sobre privacidade e proteção de dados:
          </Text>
          <Text variant="bodyPrimary" style={styles.email}>
            privacy@arena.app
          </Text>
          <Text variant="bodyPrimary" style={styles.email}>
            dpo@arena.app
          </Text>
          <Text variant="captionSecondary" style={styles.footerText}>
            Protegendo seus dados, conectando pessoas apaixonadas por esportes.
          </Text>
        </View>
      </ScrollView>
    </AppLayout>
  );
};
