import { Avatar} from '@mantine/core'
import { Menu, Button, Text } from '@mantine/core';
import React from 'react'
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/Slices/authSlice.js';
import { useNavigate } from 'react-router-dom';

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
        <Avatar/>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          Settings
        </Menu.Item>
        <Menu.Item>
          Messages
        </Menu.Item>
        <Menu.Item color='red' onClick={handleSignOut}>
        Sign Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>

       
    </div>
  )
}
