// src/Employees.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Employees({ onLogout }) {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState(''); // 添加员工的 firstName
  const [lastName, setLastName] = useState('');   // 添加员工的 lastName
  const [description, setDescription] = useState(''); // 添加员工的 description

  // 获取员工列表
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/api/employees', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log('员工数据:', response.data);
      setEmployees(response.data);
    })
    .catch(error => {
      console.error('获取员工信息失败:', error);
      if (error.response) {
        if (error.response.status === 401) {
          // 未授权，清除令牌并重定向到登录页面
          localStorage.removeItem('token');
          onLogout();
        } else {
          setError(`获取员工信息失败：${error.response.status} ${error.response.statusText}`);
        }
      } else {
        setError('获取员工信息失败。');
      }
    });
  }, [onLogout]);

  // 添加员工
  const handleAddEmployee = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const newEmployee = {
      firstName,
      lastName,
      description,
    };
    axios.post('http://localhost:8080/api/employees', newEmployee, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log('添加员工成功:', response.data);
      setEmployees([...employees, response.data]); // 更新员工列表
      // 清空输入框
      setFirstName('');
      setLastName('');
      setDescription('');
    })
    .catch(error => {
      console.error('添加员工失败:', error);
      if (error.response) {
        if (error.response.status === 401) {
          // 未授权，清除令牌并重定向到登录页面
          localStorage.removeItem('token');
          onLogout();
        } else {
          setError(`添加员工失败：${error.response.status} ${error.response.statusText}`);
        }
      } else {
        setError('添加员工失败。');
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout(); // 调用父组件的登出函数，更新登录状态
  };

  if (error) {
    return (
      <div>
        <h1>员工列表</h1>
        <button onClick={handleLogout}>登出</button>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>员工列表</h1>
      <button onClick={handleLogout}>登出</button>
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.firstName} {emp.lastName} - {emp.description}
          </li>
        ))}
      </ul>

      <h2>添加员工</h2>
      <form onSubmit={handleAddEmployee}>
        <div>
          <label>First Name：</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name：</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description：</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">添加员工</button>
      </form>
    </div>
  );
}

export default Employees;
