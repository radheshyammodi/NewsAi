import { Avatar} from '@mantine/core'
import { Menu, Divider, Text } from '@mantine/core';
import React from 'react'
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/Slices/authSlice.js';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from '../utils/utils';
import { LogOut, User, Bookmark, Book, Mail } from 'lucide-react';

export const ProfileDropDown = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignOut = ()=>{
        dispatch(logOut())
        navigate('/login')
    }

  return (
    <div>

    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar className='cursor-pointer'/>
      </Menu.Target>

      <Menu.Dropdown>
      <Link to="/profile">
      <Menu.Item leftSection={<User size={16}/>}>
          Profile
        </Menu.Item>
      </Link>
       
      
      <Menu.Item
            leftSection={<Bookmark size={16} />}
            onClick={handleSignOut}
          >
            Bookmarks
          </Menu.Item>
          <Menu.Item leftSection={<Book size={16} />} onClick={handleSignOut}>
            Reading History
          </Menu.Item>

          <Divider />
          <Menu.Item
            leftSection={<LogOut size={16} />}
            color="red"
            onClick={handleSignOut}
          >
            Sign Out
          </Menu.Item>

          <Text leftSection={<Mail size={16} />} ml={20} size="sm">
            {getCookie('email')}
          </Text>

      </Menu.Dropdown>
    </Menu>

       
    </div>
  )
}
