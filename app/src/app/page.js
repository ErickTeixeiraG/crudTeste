

'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null); 

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    const response = await axios.get('http://localhost:5000/usuarios');
    setUsuarios(response.data);
  };

  const handleSubmit = async () => {
    if (!nome || !email) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    if (editId) {
      
      await axios.put(`http://localhost:5000/usuarios/${editId}`, { nome });
      setEditId(null);
    } else {
      
      await axios.post('http://localhost:5000/usuarios', { nome, email });
    }
    setNome('');
    setEmail('');
    fetchUsuarios();
  };

  const handleEdit = (usuario) => {
    setNome(usuario.nome);
    setEmail(usuario.email);
    setEditId(usuario.usuarioId);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      await axios.delete(`http://localhost:5000/usuarios/${id}`);
      fetchUsuarios();
    }
  };

  return (
    <div style={{ backgroundColor: '#064d96', minHeight: '100vh', color: 'white' }}>
      
<header style={{ backgroundColor: '#061d51', padding: '10px', display: 'flex', alignItems: 'center' }}>
    <img
    src="./img/logoEdigital.png" 
    alt="Logo"
    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
  />
  <h1 style={{ marginLeft: '10px', fontSize: '24px', color: 'white' }}>Gerenciador de Usuários</h1>
</header>

      {}
      <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', backgroundColor: '#061d51', borderRadius: '8px' }}>
        <h2 style={{ textAlign: 'center' }}>{editId ? 'Editar Usuário' : 'Adicionar Usuário'}</h2>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '4px',
              border: 'none',
              outline: 'none',
            }}
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite o email"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '4px',
              border: 'none',
              outline: 'none',
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#064d96',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {editId ? 'Salvar Alterações' : 'Adicionar Usuário'}
          </button>
        </div>

        <h3 style={{ textAlign: 'center' }}>Lista de Usuários</h3>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {usuarios.map((usuario) => (
            <li
              key={usuario.usuarioId}
              style={{
                backgroundColor: '#064d96',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>
                {usuario.nome} - {usuario.email}
              </span>
              <div>
                <button
                  onClick={() => handleEdit(usuario)}
                  style={{
                    backgroundColor: '#061d51',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 10px',
                    marginRight: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(usuario.usuarioId)}
                  style={{
                    backgroundColor: '#d9534f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                  }}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}



