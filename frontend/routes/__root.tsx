import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import * as React from 'react'
import { Layout } from '../layout'
export const Route = createRootRoute({
	component: () => (
		<React.Fragment>
			<Layout>
				<Outlet />
			</Layout>
			{import.meta.env.PROD ? null : <TanStackRouterDevtools />}
		</React.Fragment>
	),
})
