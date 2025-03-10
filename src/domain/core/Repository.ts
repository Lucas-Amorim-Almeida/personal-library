export default interface Repository {
  /**
   * Retorna um único item com base nos critérios fornecidos.
   * @param query - Os critérios de busca para encontrar o item.
   * @returns Uma promessa que resolve para o item encontrado.
   */
  getOne<Input, Output>(query: Input): Promise<Output | null>;

  /**
   * Retorna múltiplos itens com base nos filtros fornecidos e uma limitação de quantidade.
   * @param query - Os critérios de busca para encontrar os itens.
   * @param take: A quantidade máxima de itens a serem retornados.
   * @returns Uma promessa que resolve para os itens encontrados.
   */
  getMany<Input, Output>(query: Input, take?: number): Promise<Output[]>;

  /**
   * Retorna todos os itens com base nos filtros fornecidos.
   * @param query - Os critérios de busca para encontrar os itens.
   * @returns Uma promessa que resolve para um array de todos os itens encontrados.
   */
  getAll<Input, Output>(query?: Input): Promise<Output[]>;

  /**
   * Salva os dados em uma base de dados.
   * @param data - Dados a serem salvos.
   * @returns Uma promessa que resolve para o objeto salvo, possivelmente enriquecido com informações adicionais.
   */
  save<Input, Output>(data: Input): Promise<Output>;

  /**
   * Atualiza dados em uma base de dados.
   * @param data - Incluem parâmtros de busca e as modificações que serão aplicadas em um elemento do banco de dados.
   * @returns Uma promessa que resolve para o objeto alterado, possivelmente enriquecido com informações adicionais.
   */
  update<Input, Output>(data: Input): Promise<Output>;

  /**
   * Remove dados em uma base de dados.
   * @param data - Parâmetros de busca de um objeto no banco de dados que será deletado.
   * @returns Uma promessa que resolve para o objeto removido.
   */
  delete<Input, Output>(data: Input): Promise<Output>;
}
