import { db } from "../db.js";

export const getUsers = (_,res) => {

    const query = 'SELECT * FROM usuarios';

    db.query(query, (err,data) => {

        if (err)
            return res.json(err);

        return res.status(200).json(data.rows);
    });
};

export const addUser = (req, res) => {
    const values = [
        req.body.nome,
        req.body.email,
        req.body.endereco,
        req.body.idade,
        req.body.telefone,
        req.body.cpf,
    ];
    const q =
        "INSERT INTO usuarios (nome, email, endereco, idade, telefone, cpf) VALUES ($1, $2, $3, $4, $5, $6)";

        db.query(q, values, (err) => {

        if (err) return res.json(err);
    
        return res.status(200).json("Usuário criado com sucesso.");
    });
};

export const updateUser = (req, res) => {
    const q =
        "UPDATE usuarios SET nome = $1, email = $2, endereco = $3, idade = $4, telefone = $5, cpf = $6 WHERE id = $7";

    const values = [
        req.body.nome,
        req.body.email,
        req.body.endereco,
        req.body.idade,
        req.body.telefone,
        req.body.cpf,
        req.params.id
    ];

    db.query(q, values, (err) => {
        if (err) return res.status(500).json("Erro ao atualizar usuário.");
        return res.status(200).json("Usuário atualizado com sucesso.");
    });
};

export const deleteUser = (req, res) => {
    const q = "DELETE FROM usuarios WHERE id = $1"

    db.query(q, [req.params.id], (err) => {
        if (err)
            return res.json(err);
        return res.status(200).json("Usuário deletado com sucesso");
    });
};