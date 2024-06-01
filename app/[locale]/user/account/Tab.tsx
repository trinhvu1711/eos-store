'use client'
import { useState } from 'react'
import { Tab } from '@headlessui/react'

function classNames(...classes:any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  let [categories] = useState({
    "Địa Chỉ Giao Hàng": [
      {
        id: 1,
        title: '20, An Duong Vuong',
        name: 'Tran Van A',
        phone: '0123456789',
      },
      {
        id: 2,
        title: 'ABC Town, Bình Thạnh, TPHCM',
        name: 'Nguyen Van B',
        phone: '0123456789',
      },
    ],
    "Thanh Toán": [
      {
        id: 1,
        title: 'Tiền Mặt',
        name: 'Giao hàng tận nơi',

      },
      {
        id: 2,
        title: 'TP Bank',
        name: 'Visa',
        phone: '4889 0123 7410 8989',
      },
    ],
  })

  return (
    <div className="w-full sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-rose-50 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-rose-600',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-rose-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-rose-100'
                    : 'text-rose-600 hover:bg-rose-100 hover:text-rose-600'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-rose-400 focus:outline-none focus:ring-2'
              )}
            >
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative rounded-md p-3 hover:bg-gray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {post.title}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <li>{post.name}</li>
                      <li>&middot;</li>
                      <li>{post.phone}</li>
                    </ul>

                    <a
                      href="#"
                      className={classNames(
                        'absolute inset-0 rounded-md',
                        'ring-rose-400 focus:z-10 focus:outline-none focus:ring-2'
                      )}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
