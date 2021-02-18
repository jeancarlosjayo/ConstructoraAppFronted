const EmpresaReducer = (state, action) => {
  switch (action?.type) {
    case "añadir":
      return {
        ...state,
        empresas: [...state.empresas, action?.payload],
      };
    // case 'recupero':
    //     return{
    //         ...state,
    //         carro:action?.payload?.carro
    //     }
    // case 'actualizar':
    //     return{
    //         ...state,
    //         carro:[...state.carro.map(item =>{
    //             if(item.IdProducto === action?.payload?.id){
    //                 item.cantidad = action?.payload?.cantidad
    //                 item.subtotal = action?.payload?.subtotal
    //             }
    //             return item
    //         })]
    //     }
    // case 'email':
    //     return {
    //         ...state,
    //         carro:[...state.carro.map(item =>{
    //             if(item.IdProducto === action?.payload?.id){
    //                 item.email = action?.payload?.email
    //                 // item.subtotal = action?.payload.subtotal
    //             }
    //             return item
    //         })]
    //     }
    // case 'eliminar':
    //     return{
    //         carro:[]
    //     }
    // case 'pedido':
    //     return{
    //         ...state,
    //         subtotal:action?.payload?.subtotal,
    //         descuento:action?.payload?.descuento,
    //         total:action?.payload?.total,
    //     }

    default:
      break;
  }
};
export default EmpresaReducer;
