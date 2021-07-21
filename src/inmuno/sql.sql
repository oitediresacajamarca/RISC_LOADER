SELECT *,ROW_NUMBER() OVER(partition by numero_documento order by numero_documento,fecha_atencion asc  ) orden 
	INTO #SEGUIMIENTO
	FROM rpt_plano_cbeta_acum
	
	WHERE tipo_edad='M'  and  anio=@anio and (
	codigo_item='C0011'
	or (codigo_item='99499.10' and id_cita in 
	(select * from rpt_plano_cbeta_acum
	where codigo_item in ('Z298','99199.17','99199.19','D509')
	 )
	 OR 

	 (codigo_item='99499.08' and id_cita in 
	(select * from rpt_plano_cbeta_acum
	where codigo_item in ('Z298','99199.17','99199.19','D509')
	 )
	 
	 )
	 )