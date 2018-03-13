ALTER TABLE tutorweb.modulos ADD COLUMN campo_chave varchar(100) default null;
UPDATE tutorweb.modulos SET campo_chave = 'cod_recado' WHERE nome LIKE 'recado%'

ALTER TABLE tutorweb.modulos ADD COLUMN tabela_chave varchar(100) default null;
UPDATE tutorweb.modulos SET tabela_chave = 'recado' WHERE nome LIKE 'recado%'

/*
OLD 

CREATE TABLE tutorweb.mensagem(
	cod_mensagem			int(8) NOT NULL PRIMARY KEY AUTO_INCREMENT
	,assunto				VARCHAR(250) NOT NULL 
	,corpo 					TEXT         NOT NULL 
	,modulo_chave			tinyint(3) 		-- 6 - 'recado', 13 - 'recados', ? - 'ocorrencia'
	,modulo_chave_valor 	int(11)			-- recado.cod_recado = 1
);

CREATE TABLE tutorweb.disparo(
	 cod_disparo			int(8) NOT NULL PRIMARY KEY AUTO_INCREMENT
	,cli 					varchar(60)	NOT NULL  -- cabrini 
	,cod_mensagem 			int(8) NOT NULL       -- ref 
	,canal					varchar(50)	NOT NULL  -- PUSH, 'Email' 	
	,rm			 			varchar(11)           -- 20 	
	,chave_valor			varchar(11) NOT NULL  -- 'responsavel', 'aluno' 
	,valor					VARCHAR(250) NOT NULL -- cod_responsavel = 1320 
	,criado_em				datetime NOT NULL
	,destino_disparo		varchar(400)
	,enviado_em 			datetime 	
	,fila_status			CHAR(12) NOT NULL     -- NOVO, PROCESSANDO, PROCESSADO, CANCELADO
	,fila_status_em			DATETIME DEFAULT CURRENT_TIMESTAMP
	,lido_em 				datetime
	,lido_canal				varchar(50) default ''
	,lido_status			tinyint(1)	default 0
	,checado_status			tinyint(1)	default 0
	,checado_em				datetime		

);

DROP TABLE tutorweb.disparo;
DROP TABLE  tutorweb.mensagem;
*/

-- NOVA Modelagem
CREATE TABLE alerta(
	 cod_alerta				int(8) NOT NULL PRIMARY KEY AUTO_INCREMENT
	,assunto				VARCHAR(250) NOT NULL 
	,corpo 					TEXT         NOT NULL 
	,modulo_chave			tinyint(3) 		/* 6 - 'recado', 13 - 'recados', ? - 'ocorrencia'*/
	,modulo_chave_valor 	int(11)			/*recado.cod_recado = 1*/
);
ALTER TABLE alerta ADD INDEX modulo_chave_valor (modulo_chave_valor);

CREATE TABLE disparo(
	 cod_disparo			int(8) NOT NULL PRIMARY KEY AUTO_INCREMENT	
	,cod_alerta 			int(8) NOT NULL /*ref*/
	,canal					varchar(50)	NOT NULL /*PUSH, 'Email'*/	
	,rm			 			varchar(11) /*20*/	
	,chave_valor			varchar(11) NOT NULL /*'responsavel', 'aluno'*/
	,valor					VARCHAR(250) NOT NULL /*cod_responsavel = 1320*/
	,criado_em				datetime NOT NULL
	,destino_disparo		varchar(400)
	,enviado_em 			datetime 	
	,fila_status			CHAR(12) NOT NULL /*NOVO, PROCESSANDO, PROCESSADO, CANCELADO*/
	,fila_status_em			DATETIME
	,lido_em 				datetime
	,lido_canal				varchar(50) default ''
	,lido_status			tinyint(1)	default 0
	,checado_status			tinyint(1)	default 0
	,checado_em				datetime
);
ALTER TABLE disparo ADD INDEX valor (valor);


CREATE TABLE tutorweb.fila(
	 cod_fila			int(8) NOT NULL PRIMARY KEY AUTO_INCREMENT	
	,cli  				varchar(60)	NOT NULL /*cabrini*/
	,cod_disparo	    int(8) NOT NULL
	,criado_em			datetime NOT NULL
	,status 			tinyint(1)	default 0
	,enviado_em 		datetime 	
);


/*Facilita ...*/
INSERT INTO alerta (assunto, corpo, modulo_chave, modulo_chave_valor) (
	SELECT titulo, recado, 6 AS modulo_chave, cod_recado FROM recado
);

INSERT INTO disparo(
	 cod_alerta
	,canal
	,rm
	,chave_valor
	,valor
	,criado_em
	,fila_status
	,lido_canal
	,lido_status
	,checado_status
) (
	SELECT
		 alerta.cod_alerta
		,'TUTORWEB' AS canal
		,alunoresponsavel.rm
		,'responsavel' AS chave_valor
		,alunoresponsavel.cod_responsavel AS valor
		,recado.criado_em AS criado_em	
		,'PROCESSADO' AS fila_status
		,'TUTORWEB' AS lido_canal
		,1 AS lido_status
		,1 AS checado_status		
	FROM 
	recado
	INNER JOIN recado_aluno ON(
		recado_aluno.cod_recado = recado.cod_recado
	)
	INNER JOIN alunoresponsavel ON(
		alunoresponsavel.rm = recado_aluno.rm
	)
	INNER JOIN alerta ON(
		alerta.modulo_chave_valor = recado_aluno.cod_recado
	)
	WHERE 	
	recado.mostrar_ate > NOW()
	AND recado.excluido = 0
);


INSERT INTO twmodulos (modulo_id, sessao, ordem) VALUES (65, NULL, 4);

