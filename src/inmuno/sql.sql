SELECT        dbo.VACUNADOS_COVID.abrev_tipo_doc, dbo.VACUNADOS_COVID.num_doc, dbo.VACUNADOS_COVID.id_ubigeo_res, dbo.VACUNADOS_COVID.departamento_residencia, dbo.VACUNADOS_COVID.provincia_residencia, 
                         dbo.VACUNADOS_COVID.distrito_residencia, dbo.VACUNADOS_COVID.actividad, dbo.VACUNADOS_COVID.anioedad_atencion, dbo.VACUNADOS_COVID.mesedad_atencion, dbo.VACUNADOS_COVID.diaedad_atencion, 
                         CONVERT(DATE, dbo.VACUNADOS_COVID.fecha_vacunacion, 103) AS fecha_vacunacion, dbo.VACUNADOS_COVID.id_vac_pac, dbo.VACUNADOS_COVID.codigo_vacuna, dbo.VACUNADOS_COVID.vacuna, 
                         dbo.VACUNADOS_COVID.dosis_aplicada, dbo.VACUNADOS_COVID.gruporiesgo, dbo.VACUNADOS_COVID.comorbilidad, dbo.VACUNADOS_COVID.contactotbp, dbo.VACUNADOS_COVID.vacunador, dbo.VACUNADOS_COVID.DISA, 
                         dbo.VACUNADOS_COVID.RED, dbo.VACUNADOS_COVID.MICRORED, dbo.VACUNADOS_COVID.cod_unico, dbo.VACUNADOS_COVID.establecimiento, dbo.VACUNADOS_COVID.departamento_establecimiento, 
                         dbo.VACUNADOS_COVID.provincia_establecimiento, dbo.VACUNADOS_COVID.distrito_establecimiento, dbo.VACUNADOS_COVID.fecha_registro, dbo.VACUNADOS_COVID.registrador, dbo.VACUNADOS_COVID.codigo_modular, 
                         dbo.VACUNADOS_COVID.id_estrategiavac, dbo.VACUNADOS_COVID.id_tipoactividad, dbo.VACUNADOS_COVID.Column36, CASE WHEN me.Codigo_Sector = 2 THEN 'ESSALUD' ELSE 'GOBIERNO REGIONAL' END AS SECTOR
FROM            dbo.VACUNADOS_COVID INNER JOIN
                         BDHIS_MINSA.dbo.MAESTRO_HIS_ESTABLECIMIENTO AS me ON me.Codigo_Unico = CAST(dbo.VACUNADOS_COVID.cod_unico AS integer)
WHERE        (CONVERT(DATE, dbo.VACUNADOS_COVID.fecha_vacunacion, 103) >= '2021-02-22') AND (dbo.VACUNADOS_COVID.dosis_aplicada LIKE '1%') OR
                         (CONVERT(DATE, dbo.VACUNADOS_COVID.fecha_vacunacion, 103) >= '2021-02-22') 
						 AND (dbo.VACUNADOS_COVID.dosis_aplicada LIKE '1%') AND (me.Codigo_Unico IN
                             (SELECT        dbo.VACUNADOS_COVID.cod_unico
                               FROM            BDHIS_MINSA.dbo.MAESTRO_HIS_ESTABLECIMIENTO
                               WHERE        (Codigo_Sector = 2)))