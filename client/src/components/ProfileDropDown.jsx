import { Avatar} from '@mantine/core'
import { Menu, Button, Text } from '@mantine/core';
import React from 'react'
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/Slices/authSlice.js';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

export const ProfileDropDown = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignOut = ()=>{
        dispatch(logOut())
        navigate('/login')
    }

  return (
    <div>

    <Menu shadow="md" width={150}>
      <Menu.Target>
        <Avatar className='cursor-pointer'/>
      </Menu.Target>

      <Menu.Dropdown>
      <Link to="/profile">
      <Menu.Item leftSection={<User size={16}/>}>
          Profile
        </Menu.Item>
      </Link>
       
      
        <Menu.Item color='red' onClick={handleSignOut} leftSection={<LogOut size={16}/>}>
        Sign Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>

       
    </div>
  )
}
