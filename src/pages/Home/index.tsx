import React, { useState, useEffect } from 'react';
import './style.css';
import { Sun, MoonStars } from 'phosphor-react'

import { Card, CardProps } from '../../components/Card';

export function Home() {
  const [studentName, setStudentName] = useState("");
  const [isThemeDark, setIsThemeDark] = useState(true)
	const [students, setStudents] = useState<CardProps[]>([]);
	const [user, setUser] = useState({ name: '', avatar: '' })

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setStudents((prevState) => [...prevState, newStudent]);
  }

  useEffect(() => {
  	fetch('https://api.github.com/users/cnkelvin')
  	.then(response => response.json())
  	.then(data => {
  		setUser({
  			name: data.name,
  			avatar: data.avatar_url,
  		})
  	});
  }, []);

  function toggleMode() {
      const html = document.documentElement
  html.classList.toggle('light')
  setIsThemeDark(!isThemeDark)
  }

  return (
    <div className="container">
   		<header>
     		<h1>Lista de Presença</h1>
     		<div>
     			<strong>{user.name}</strong>
     			<img src={user.avatar} alt="Foto de perfil" />
     		</div>
     	</header>

      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={(e) => setStudentName(e.target.value)}
      />
      <button id="add-student" type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

    <div id="switch" onClick={toggleMode}>
      <button>
        <div className="svg-icons">
           {isThemeDark ? <MoonStars color="#000000" size={16} /> : <Sun color="#000000" size={16} /> }
        </div>
      </button>
      <span></span>
    </div>

      {students.map((student) => (
        <Card 
        	key={student.time}
        	name={student.name} 
        	time={student.time} 
        />
      ))}
    </div>
  );
}