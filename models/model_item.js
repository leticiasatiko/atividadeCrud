class Item {
    constructor(id, nome, tipo, forca, defesa) {
        if(tipo === "Arma" && defesa != 0){
            throw new Error("Defesa deve ser ZERO");
        }

        if(tipo === "Armadura" && forca != 0){
            throw new Error("Força deve ser ZERO");
        }

        if(forca === 0 && defesa === 0){
            throw new Error("Força e Defesa não podem ser ZERO ao mesmo tempo")
        }

        this.id = id;
        this.nome = nome;
        this.tipo = tipo;
        this.forca = forca;
        this.defesa = defesa;
    }
}


export default Item;