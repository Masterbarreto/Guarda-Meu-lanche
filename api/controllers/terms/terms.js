import { StatusCodes } from "http-status-codes";
import { handleError } from "../handlers/handleServerError.js";

export const terms = async (req, res) => {
  try {
    const loremTerms = {
      title: "Termos e Condições",
      version: "1.0",
      date: "2024-09-27",
      content: [
        {
          section: "Introdução",
          text: "Bem-vindo aos nossos termos e condições. Ao acessar este aplicativo, você concorda em cumprir e ser regido por estes termos. Se você não concordar com qualquer parte desses termos, não utilize nosso aplicativo.",
        },
        {
          section: "Uso do Serviço",
          text: "Este aplicativo é fornecido 'no estado em que se encontra' e pode conter erros, interrupções e outros problemas. Não garantimos que o aplicativo atenderá às suas expectativas ou que estará livre de erros.",
        },
        {
          section: "Limitação de Responsabilidade",
          text: "Em nenhum caso, seremos responsáveis por quaisquer danos diretos, indiretos, incidentais, especiais ou consequenciais que resultem do uso ou da incapacidade de usar este aplicativo.",
        },
        {
          section: "Alterações",
          text: "Reservamo-nos o direito de modificar estes termos a qualquer momento. Quaisquer alterações entrarão em vigor imediatamente após a publicação dos termos revisados neste aplicativo.",
        },
        {
          section: "Legislação Aplicável",
          text: "Estes termos serão regidos e interpretados de acordo com as leis do Brasil. Você concorda que qualquer disputa relacionada a estes termos será resolvida nos tribunais do Brasil.",
        },
        {
          section: "Contato",
          text: "Se você tiver alguma dúvida sobre estes termos, entre em contato conosco através do nosso e-mail: contato@exemplo.com.",
        },
      ],
    };

    return res.status(StatusCodes.OK).json(loremTerms);
  } catch (e) {
    handleError({ r: res, e });
  }
};
