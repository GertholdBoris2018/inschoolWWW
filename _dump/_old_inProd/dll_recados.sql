ALTER TABLE recadoclasse ADD COLUMN novo int(1) DEFAULT 1;
ALTER TABLE recado_aluno ADD COLUMN por_classe int(1) DEFAULT 0;
ALTER TABLE recado_aluno ADD INDEX rm (RM);






ALTER TABLE recado_aluno ADD COLUMN excluido tinyint(4) DEFAULT 0;
ALTER TABLE recado_aluno ADD COLUMN excluidopor varchar(50);
ALTER TABLE recado_aluno ADD COLUMN excluidoem datetime;

/*Vamos utilizar para pegar APENAS o periodo da classe, Ex: 1 - Bimestre*/
ALTER TABLE recado_aluno ADD COLUMN id_classe bigint(20) DEFAULT NULL
;





INSERT INTO recado_aluno ( rm, cod_recado, por_classe, id_classe) 
SELECT 
	 ca.rm
	,rc.cod_recado
	,1 AS por_classe 
	,ca.id_classe
FROM recadoclasse rc 
	INNER JOIN recado r ON rc.cod_recado = r.cod_recado
 	INNER JOIN classe_aluno ca ON ca.id_classe = rc.id_classe
WHERE 
	ca.data_matricula <  r.criado_em 
	AND ca.data_saida > r.criado_em	

;

UPDATE recadoclasse SET novo = 0
;

/*
----- 
INSERT INTO recado_aluno ( rm, cod_recado, por_classe ) 
SELECT 
	 ca.rm
	,rc.cod_recado
	,1 AS por_classe 
FROM recadoclasse rc 
	INNER JOIN recado r ON rc.cod_recado = r.cod_recado
 	INNER JOIN classe_aluno ca ON ca.id_classe = rc.id_classe
WHERE 
	ca.data_matricula <  r.criado_em 
	AND ca.data_saida > r.criado_em	
*/

/*

addRecadoClasse(cod_recado, id_classe)
	insert na tabela recado_classe	
	insert na tabela recado_aluno
*/