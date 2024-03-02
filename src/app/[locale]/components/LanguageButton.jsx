"use client"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { GlobalOutlined } from '@ant-design/icons';
import {Avatar} from "@nextui-org/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5   text-5xl mr-16 font-normal text-gray-900 shadow-sm hover:bg-gray-50 ">
        <GlobalOutlined />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
          <Menu.Item>
  {({ active }) => (
    <a
      href="#"
      className={classNames(
        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
        'block px-4 py-2 text-m',
        'inline-flex items-center' // This ensures items are aligned inline and centered
      )}
    >
      <Avatar alt="USA" className="w-7 h-7 mr-2" src="https://flagcdn.com/us.svg" /> English
    </a>
  )}
</Menu.Item>
<Menu.Item>
  {({ active }) => (
    <a
      href="#"
      className={classNames(
        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
        'block px-4 py-2 text-m',
        'inline-flex items-center' // This ensures alignment and centering here as well
      )}
    >
      <Avatar alt="Germany" className="w-7 h-7 mr-2" src="https://flagcdn.com/de.svg" /> Deutsch
    </a>
  )}
</Menu.Item>

           
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}