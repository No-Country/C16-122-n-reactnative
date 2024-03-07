export const recoveryPasswordHtml = (name: string, code: string) => {
  return `
  <div  
  style="
    display: flex;
    width: 100%;
    "   >
    <span
        class="m_-5492978235239917155mb_text"
        style="
          font-family: Helvetica Neue, Helvetica, Lucida Grande, tahoma, verdana,
            arial, sans-serif;
          font-size: 16px;
          line-height: 21px;
          color: #141823;
          margin: auto;
          width: 560px;

        "
        ><span style="font-size: 15px"
          ><p></p>
          <div style="margin-top: 16px; margin-bottom: 20px">
            Hola, ${name}:
          </div>
          <div>
            Recibimos una solicitud para restablecer tu contraseña de tuBar.
          </div>
          Ingresa el siguiente codigo para restablecer la contraseña:
    
          <table
            border="0"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            style="border-collapse: collapse"
          >
            <tbody>
              <tr>
                <td height="20" style="line-height: 20px">&nbsp;</td>
              </tr>
              <tr>
                <td align="middle">
                <b>${code}</b>
                </td>
              </tr>
              <tr>
                <td height="8" style="line-height: 8px">&nbsp;</td>
              </tr>
              <tr>
                <td height="20" style="line-height: 20px">&nbsp;</td>
              </tr>
            </tbody>
          </table>
          <p></p>

          Recuerde que solo tiene unos minutos para completar el proceso.
          <br />
        </span>
        <div>
          <div></div>
          <div></div></div
      >
    </span>
  </div> 
`;
};
