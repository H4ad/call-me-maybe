/**
 * A interface que representa a interface base para 
 * as entidades
 */
export interface IEntidade {
  id: number;
}

/**
 * A interface que representa a implementação do comportamento 
 * de buscar um anuncio
 */
export interface IBuscaAnuncio {
  buscarAnuncio(): Anuncio[];
}

/**
 * A interface que representa a implementação do comportamento 
 * de criar um anuncio
 */
export interface ICriaAnuncio {
  criaAnuncio(anuncio: Anuncio): Anuncio;
}

/**
 * A interface que representa a implementação do comportamento 
 * de atualizar um anuncio
 */
export interface IAtualizaAnuncio {
  atualizaAnuncio(anuncio: Anuncio): void;
}

/**
 * A interface que representa a implementação do comportamento 
 * de remover um anuncio
 */
export interface IRemoveAnuncio {
  removeAnuncio(anuncioId: number): void;
}

/**
 * A classe que representa o usuário e implementa a IEntidade
 * e além de implementar o comportamento IBuscaAnuncio
 */
export abstract class Usuario implements IEntidade, IBuscaAnuncio {
  public id: number;
  public email: string;
  public nome: string;
  public senha: string;
  public imagem: string;
  public telefone: string;

  public abstract buscarAnuncio(): Anuncio[];
}

/**
 * A interface que representa o usuário e herda os comportamentos
 * e propriedades do Usuario
 */
export class Cliente extends Usuario implements IBuscaAnuncio {
  public buscarAnuncio(): Anuncio[] {
    console.log('Busca os anuncios que ele REQUISITOU.');

    return [];
  }
  public entrarEmContato(): void {
    console.log('Entrar em contato.');
  }
}

/**
 * A interface que representa um anunciante e herda os comportamentos
 * e propriedades do Usuario e implementa alguns comportamentos
 */
export abstract class Anunciante extends Usuario implements IBuscaAnuncio, ICriaAnuncio, IRemoveAnuncio, IAtualizaAnuncio {
  public buscarAnuncio(): Anuncio[] {
    console.log('Busca os anuncios que ele CRIOU.');

    return [];
  }
  public criaAnuncio(anuncio: Anuncio): Anuncio {
    console.log('Anuncio criado.');

    return anuncio;
  }
  public removeAnuncio(anuncioId: number): void {
    console.log('Anuncio removido.');
  }
  public atualizaAnuncio(anuncio: Anuncio): void {
    console.log('Anuncio atualizado.');
  }
}

/**
 * A classe que representa um anuncio e implementa o IEntidade
 */
export class Anuncio implements IEntidade {
  id: number;
  titulo: string;
  descricao: string;
  tags: string;
  anunciante: Anunciante;
}

/**
 * O classe que representa o serviço que lida com a moderação 
 * dos anuncios.
 */
export class ModeradorService implements IAtualizaAnuncio, IRemoveAnuncio {
  private atuante: IAtualizaAnuncio & IRemoveAnuncio;

  public setAtuante(atuante: IAtualizaAnuncio & IRemoveAnuncio): void {
    this.atuante = atuante;
  }

  public removeAnuncio(anuncioId: number): void {
    this.atuante.removeAnuncio(anuncioId);
  }
  public atualizaAnuncio(anuncio: Anuncio): void {
    this.atuante.atualizaAnuncio(anuncio);
  }
}