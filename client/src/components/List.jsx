import React from 'react'
import { Divider,Menu } from '@mantine/core'
import { EllipsisVertical,Trash } from 'lucide-react'

export const List = (data) => {
  return (
    <div>
         {data.length > 0 ? data.map((rh)=>(
                <>
                <div className="flex items-center">
                <Menu>
                <Menu.Target>
                <EllipsisVertical className="cursor-pointer"/>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item color="red" leftSection={<Trash/>}>Delete</Menu.Item>
                </Menu.Dropdown>
                </Menu>
                
                <a href={rh.url} className="block hover:underline hover:text-blue-400 p-3" target="_blank">{rh.title}</a>
                </div> <Divider/> </>
              )): null}
    </div>
  )
}
