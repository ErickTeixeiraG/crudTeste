'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [usuarios, setUsuarios] = useState([]); 
  const [nome, setNome] = useState('');  
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    const response = await axios.get('http://localhost:5000/usuarios');
    setUsuarios(response.data);
  };

  const addUsuario = async () => {
    await axios.post('http://localhost:5000/usuarios', { nome, email });
    setNome('');
    fetchUsuarios();
  };

  const deleteUsuario  = async (id) => {
    await axios.delete(`http://localhost:5000/usuarios/${id}`);
    fetchUsuarios();
  };

  return (
    <div>
      <h1>CRUD Básico</h1>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Digite o nome"
      />
      <button onClick={addUsuario}>Adicionar</button>
      <ul>
        {items.map((usuario) => (
          <li key={usuario.usuarioId}>
            {usuario.nome} - {usuario.email}{' '}
            <button onClick={() => deleteUsuario(usuario.usuarioId)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}