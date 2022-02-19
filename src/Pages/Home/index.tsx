//@ts-nocheck
import "../../App.css";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [dark, setDark] = useState(true);
  const [newAge, setNewAge] = useState(0);
  const [newName, setNewName] = useState("");
  const [editAge, setEditAge] = useState(0);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data, "Meus dados do Firebase");

      console.log(data.docs, "acessando os docs do data");

      console.log(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        "testando"
      );

      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
      alert("Usuário deletado com sucesso!");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const handleChangeAgeButton = async (id, age) => {
    console.log(id, age, "testando o id e a idade, sera que vem?");
    try {
      const userDoc = doc(db, "users", id);
      const newFields = { age: editAge };
      await updateDoc(userDoc, newFields);
      alert("Sucesso idade alterada!");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const handleSubmit = async () => {
    try {
      await addDoc(usersCollectionRef, {
        name: newName,
        age: newAge,
        admin: false,
      });
      alert("cadastrado com sucesso!");
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  };

  console.log(users, "carregou dados?");

  const theme = {
    backgroundColor: dark ? "#1a1a1a" : "#fff",
    width: "100%",
    minHeight: "100vh",
    color: dark ? "#fff" : "#1a1a1a",
    display: "flex",
    flexDirection: "column",
  };
  return (
    <div style={theme}>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "50px",
          justifyContent: "space-between",
          padding: "0 2rem",
          background: "#280532",
          alignItems: "center",
        }}
      >
        <h1>Meu Logo</h1>
        <button
          style={{ width: "100px", height: "40px" }}
          onClick={() => setDark((prevDark) => !prevDark)}
        >
          toggle theme
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "420px",
          margin: "0 auto",
          padding: "1rem",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ margin: "1rem auto" }}>Usuários no sistema</h1>
        {users.map((user) => (
          <>
            <ul
              key={user.id}
              style={{ margin: "1rem auto", listStyle: "none" }}
            >
              <li>Nome: {user.name} </li>
              <li>Idade: {user.age} </li>
              <li> Administrador: {user.admin === true ? "SIM" : "Não"} </li>
            </ul>
            <input type="number" onChange={(e) => setEditAge(e.target.value)} />
            <button
              onClick={() => {
                handleChangeAgeButton(user.id, user.age);
              }}
            >
              Mudar a idade
            </button>
            <button onClick={() => handleDeleteUser(user.id)}>
              Deletar user
            </button>
          </>
        ))}
        <input
          type="text"
          placeholder="Digite seu nome"
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Digite a idade"
          onChange={(e) => setNewAge(e.target.value)}
        />
        <button onClick={handleSubmit}>Enviar novo user</button>
      </div>
    </div>
  );
}
