class Personagem {
    constructor(id, nome, nomeAventureiro, classe, level, forca, defesa) {
      this.id = id;
      this.nome = nome;
      this.nomeAventureiro = nomeAventureiro;
      this.classe = classe;
      this.level = level;
      this.itensMagicos = [];
  
      const total = forca + defesa;
      if (total > 10) throw new Error("Número de pontos máximo atingido! (10 pontos)");
  
      this.forca = forca;
      this.defesa = defesa;
    }
  
    atributosTotais() {
      let totalForca = this.forca;
      let totalDefesa = this.defesa;
  
      this.itensMagicos.forEach(item => {
        totalForca += item.forca;
        totalDefesa += item.defesa;
      });
  
      return { forca: totalForca, defesa: totalDefesa };
    }
  }
  
  module.exports = Personagem;
  