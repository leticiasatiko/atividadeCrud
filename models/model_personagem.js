class Personagem {
    constructor(id, nome, nomeAventureiro, classe, level, forca, defesa) {
      this.id = id;
      this.nome = nome;
      this.nomeAventureiro = nomeAventureiro;
      this.classe = classe;
      this.level = level;
      this.itensMagicos = [];
  
      const total = forca + defesa;
      if (total > 10) throw new Error("Você só pode distribuir 10 pontos entre força e defesa.");
  
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
  
    adicionarItem(item) {
      if (item.tipo === "Amuleto" && this.itensMagicos.some(i => i.tipo === "Amuleto")) {
        throw new Error("Só pode ter um amuleto.");
      }
      this.itensMagicos.push(item);
    }
  }
  
  module.exports = Personagem;
  