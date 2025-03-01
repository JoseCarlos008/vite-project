import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.endereco.value = onEdit.endereco;
      user.idade.value = onEdit.idade;
      user.telefone.value = onEdit.telefone;
      user.cpf.value = onEdit.cpf;

    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.email.value||
      !user.endereco.value||
      !user.idade.value||
      !user.telefone.value||
      !user.cpf.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:3001/" + onEdit.id, {
          nome: user.nome.value,
          email: user.email.value,
          endereco: user.endereco.value,
          idade: user.idade.value,
          telefone: user.telefone.value,
          cpf: user.cpf.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:3001/", {
          nome: user.nome.value,
          email: user.email.value,
          endereco: user.endereco.value,
          idade: user.idade.value,
          telefone: user.telefone.value,
          cpf: user.cpf.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.nome.value = "";
    user.email.value = "";
    user.endereco.value = "";
    user.idade.value = "";
    user.telefone.value = "";
    user.cpf.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Endereço</Label>
        <Input name="endereco" />
      </InputArea>
      <InputArea>
        <Label>Idade</Label>
        <Input name="idade" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="telefone" />
      </InputArea>
      <InputArea>
        <Label>CPF</Label>
        <Input name="cpf" />
      </InputArea>
  

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

const FormProduct = ({ getProducts, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const product = ref.current;

      product.nome.value = onEdit.nome;
      product.descricao.value = onEdit.descricao;

    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = ref.current;

    if (
      !product.nome.value ||
      !product.email.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:3001/" + onEdit.cod, {
          nome: product.nome.value,
          descricao: product.descricao.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:3001/", {
          nome: product.nome.value,
          product: product.product.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    product.nome.value = "";
    product.descricao.value = "";

    setOnEdit(null);
    getProducts();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>descricao</Label>
        <Input name="descricao" />
      </InputArea>
  
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
