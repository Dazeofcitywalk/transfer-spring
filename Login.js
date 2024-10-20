// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/auth/login', {
      username,
      password,
    })
    .then(response => {
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token); // 将令牌保存到 localStorage
        onLoginSuccess(); // 通知父组件登录成功
      } else {
        setError('登录失败：未收到令牌');
      }
    })
    .catch(error => {
      setError('登录失败：' + (error.response ? error.response.data.message : error.message));
    });
  };

  return (
    <div>
      <h1>登录</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>用户名：</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>密码：</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">登录</button>
      </form>
    </div>
  );
}

export default Login;
