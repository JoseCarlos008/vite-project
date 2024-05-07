import { db } from "../db.js";

export const getProduct = (_,res) => {

    const query = 'SELECT * FROM produtos';

    db.query(query, (err,data) => {

        if (err)
            return res.json(err);

        return res.status(200).json(data.rows);
    });
};

export const addProduct = (req, res) => {
    const values = [

        req.body.nome,
        req.body.descricao,

    ];
    const q =
        "INSERT INTO produtos (nome, descricao) VALUES ($1, $2)";

        db.query(q, values, (err) => {

        if (err) return res.json(err);
    
        return res.status(200).json("Produto registrado com sucesso!");
    });
};

export const updateProduct = (req, res) => {
    const q =
        "UPDATE produtos SET nome = $1, descricao = $2 WHERE cod = $3";

    const values = [
        req.body.nome,
        req.body.descricao,
        req.params.cod
    ];

    db.query(q, values, (err) => {
        if (err) return res.status(500).json("Erro ao atualizar produto.");
        return res.status(200).json("Produto atualizado com sucesso.");
    });
};

export const deleteProduct = (req, res) => {
    const q = "DELETE FROM produtos WHERE cod = $1"

    db.query(q, [req.params.cod], (err) => {
        if (err)
            return res.json(err);
        return res.status(200).json("Produto deletado com sucesso");
    });
};