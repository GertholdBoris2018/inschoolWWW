/*
ALTER TABLE responsavel ADD COLUMN token_responsavel CHAR(32) NULL;
ALTER TABLE aluno ADD COLUMN token_aluno CHAR(32) NULL;
ALTER TABLE professor ADD COLUMN token_professor CHAR(32) NULL;
ALTER TABLE usuarios ADD COLUMN token_usuario CHAR(32) NULL;


ALTER TABLE twacessos ADD COLUMN status VARCHAR(30);
ALTER TABLE twacessos ADD COLUMN aplicativo VARCHAR(50);
ALTER TABLE twacessos ADD COLUMN ip VARCHAR(50);
ALTER TABLE twacessos ADD COLUMN dispositivo VARCHAR(100);

ALTER TABLE twacessos ADD COLUMN usuario_tentativa VARCHAR(100);
*/


ALTER TABLE responsavel ADD COLUMN token_responsavel CHAR(32) NULL
;
ALTER TABLE aluno ADD COLUMN token_aluno CHAR(32) NULL
;
ALTER TABLE professor ADD COLUMN token_professor CHAR(32) NULL
;
ALTER TABLE usuarios ADD COLUMN token_usuario CHAR(32) NULL
;


ALTER TABLE twacessos ADD COLUMN status VARCHAR(30) NULL
;
ALTER TABLE twacessos ADD COLUMN aplicativo VARCHAR(50) NULL
;
ALTER TABLE twacessos ADD COLUMN ip VARCHAR(50) NULL
;
ALTER TABLE twacessos ADD COLUMN dispositivo VARCHAR(100) NULL
;
ALTER TABLE twacessos ADD COLUMN usuario_tentativa VARCHAR(100) NULL
;
ALTER TABLE responsavel ADD COLUMN device_register VARCHAR(300) NULL
;

-----

ALTER TABLE alunotemp ADD COLUMN token_aluno CHAR(32) NULL
;
ALTER TABLE alunobackup ADD COLUMN token_aluno CHAR(32) NULL
;
ALTER TABLE responsaveltemp ADD COLUMN token_responsavel CHAR(32) NULL
;
ALTER TABLE responsaveltemp ADD COLUMN device_register VARCHAR(300) NULL













