Vídeo da apresentação do sistema: 
  https://youtu.be/SLKTkae3q0w

Documento de especificação do sistema e requisitos (feito para 55PIN2, mas pode esclarecer o propósito do sistema):
  https://drive.google.com/file/d/1Ohv4RdQnXVqcxiCT9uiv8UEOOxjaUTC1/view?usp=drive_link

Observações:
  O projeto foi feito visando as disciplinas de 55PIN2 e 55DSW. Na primeira disciplina, foi construído um documento com 
  especificando o projeto. Entretanto, nem todos os requisitos descritos foram implementados até o momento.

  Atualmente o sistema permite:
  * Cadastro, login e gerenciamento de perfil (com imagem de perfil).
  * Cadstro de album e performance (com imagem de capa).
  * Cadastro de review e comentário.
  * Tela inicial com os álbuns cadastrados.
  * Tela de usuário com os álbuns e performances cadastrados.
  * Barra de pesquisa por álbum.

=========

Instruções para rodar o projeto:

-> Alterar nas propriedades do projeto Spring:
  * Credenciais do banco de dados;
  * Caminho onde serão salvas as imagens que o usuário fizer upload (se não existir, o sistema vai tentar criar);

-> Subir a aplicação backend em Java Spring;
-> Subir a aplicação frontend em React.
