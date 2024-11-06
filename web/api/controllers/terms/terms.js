import { StatusCodes } from "http-status-codes";
import { handleError } from "../handlers/handleServerError.js";
import { text } from "express";
import { version } from "react";
import { date } from "yup";

export const terms = async (req, res) => {
  try {
  const loremTerms = {
  title: "Termos e Condições de Uso do Aplicativo Lanchonete X",
  version: "2.1",
  date: "2024-11-06",
  content: [
    {
      section: "Introdução",
      text: `Bem-vindo aos termos e condições do aplicativo Lanchonete X! Ao acessar este aplicativo, você concorda em cumprir os termos e condições estabelecidos. Caso não concorde com qualquer parte desses termos, por favor, não utilize o aplicativo. O aplicativo Lanchonete X é uma plataforma para facilitar a compra e entrega de lanches e outros produtos alimentícios.`
    },
    {
      section: "Uso do Serviço",
      text: `O aplicativo Lanchonete X está disponível "como está". Não garantimos que o aplicativo seja livre de falhas ou que esteja sempre disponível sem interrupções. Nos esforçamos para oferecer a melhor experiência, mas não garantimos que o aplicativo atenda às suas expectativas ou que seja livre de erros. O uso do aplicativo é de responsabilidade exclusiva do usuário, que deve garantir que suas informações estejam corretas e completas.`
    },
    {
      section: "Limitação de Responsabilidade",
      text: `Em nenhuma circunstância a Lanchonete X será responsável por danos diretos, indiretos, incidentais, especiais ou consequenciais que possam surgir do uso ou da incapacidade de usar o aplicativo. Isso inclui, mas não se limita a, danos causados por falhas técnicas, perda de dados ou falhas no processamento de pedidos. A responsabilidade da Lanchonete X é limitada ao valor pago pelo usuário pelo serviço adquirido.`
    },
    {
      section: "Alterações nos Termos",
      text: `Reservamo-nos o direito de modificar estes termos a qualquer momento, sem aviso prévio. Quaisquer mudanças entrarão em vigor imediatamente após a publicação dos termos revisados neste aplicativo. Recomendamos que você revise periodicamente os termos para se manter informado sobre possíveis alterações.`
    },
    {
      section: "Legislação Aplicável e Jurisdição",
      text: `Estes termos serão regidos pelas leis da República Federativa do Brasil. Qualquer disputa relacionada ao uso deste aplicativo será resolvida nos tribunais da cidade de São Paulo, Estado de São Paulo. Caso qualquer cláusula dos termos seja considerada inválida ou inexequível, as demais disposições continuarão em vigor.`
    },
    {
      section: "Contato",
      text: `Se você tiver dúvidas ou sugestões sobre estes termos, entre em contato conosco através de um dos seguintes canais: E-mail: contato@lanchoneteX.com ou WhatsApp: +55 11 99999-9999. Estamos disponíveis para ajudá-lo em qualquer questão relacionada ao uso do aplicativo.`
    },
    {
      section: "Privacidade e Segurança",
      text: `A Lanchonete X preza pela segurança e privacidade dos dados dos seus usuários. Todos os dados fornecidos ao aplicativo são tratados de acordo com nossa Política de Privacidade. Para mais informações, consulte a nossa Política de Privacidade disponível no aplicativo e no nosso site. Nos comprometemos a adotar medidas de segurança razoáveis para proteger suas informações pessoais.`
    },
    {
      section: "Política de Devolução e Reembolso",
      text: `Nos esforçamos para oferecer a melhor experiência de compra, mas caso haja algum problema com o seu pedido (como atraso ou erro na entrega), você pode solicitar um reembolso ou substituição de produtos em até 7 dias após a entrega. Para mais informações, consulte nossa Política de Devolução e Reembolso no aplicativo.`
    },
    {
      section: "Consentimento para Marketing",
      text: `Ao usar o aplicativo, você consente em receber ofertas promocionais e materiais de marketing de nossa parte, incluindo descontos e lançamentos de novos produtos. Você pode cancelar a inscrição a qualquer momento, através das configurações do aplicativo ou enviando um e-mail para marketing@lanchoneteX.com.`
    }
  ]
};


    return res.status(StatusCodes.OK).json(loremTerms);
  } catch (e) {
    handleError({ r: res, e });
  }
};
