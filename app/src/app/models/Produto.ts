export interface ProdutoDTO {
  id: number;
  nome: string;
  taxa_anual: number;
  prazo_maximo: number;
}

export interface SalvarProdutoDTO extends Omit<ProdutoDTO, 'id'> {}
