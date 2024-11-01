import { Bars3Icon } from '@heroicons/react/24/solid'
import { Link } from '@tanstack/react-router'
import type React from 'react'

export function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='drawer'>
			<input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
			<div className='drawer-content flex flex-col'>
				{/* Navbar */}
				<div className='navbar bg-base-300 w-full'>
					<div className='flex-none lg:hidden'>
						<label
							htmlFor='my-drawer-3'
							aria-label='open sidebar'
							className='btn btn-square btn-ghost'
						>
							<Bars3Icon className='text-base size-8' />
						</label>
					</div>
					<div className='mx-2 flex-1 px-2'>
						<Link to='/'>pocket-react</Link>
					</div>
					<div className='hidden flex-none lg:block'>
						<ul className='menu menu-horizontal'>
							<li>
								<Link to='/notes'>Notes</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className='p-2'>{children}</div>
			</div>
			<div className='drawer-side'>
				<label
					htmlFor='my-drawer-3'
					aria-label='close sidebar'
					className='drawer-overlay'
				/>
				<ul className='menu bg-base-200 min-h-full w-80 p-4'>
					{/* Sidebar content here */}
					<li>
						<Link to='/notes'>Snippets</Link>
					</li>
				</ul>
			</div>
		</div>
	)
}
