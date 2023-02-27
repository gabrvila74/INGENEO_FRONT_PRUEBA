export interface PlanEntrega {
  idPlanEntrega: number;
  idCliente: number;
  idPuntoEntrega: number;
  idTipoProducto: number;
  cantidadProducto: number;
  fechaRegistro: string;
  fechaEntrega: string;
  precioEnvio: number;
  porcentajeDescuento: number;
  precioEnvioFinal: number;
  NumeroGuia: string;
  identificacionTransporte: string;
}
