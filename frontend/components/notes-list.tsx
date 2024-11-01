import { usePocketBase } from '@/use-pocketbase'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'

export function NotesList() {
	const pb = usePocketBase()
	const notes = useQuery({
		queryKey: ['notes'],
		queryFn() {
			return pb.collection('notes').getFullList()
		},
	})

	return (
		<>
			{notes.data?.map((note) => {
				return (
					<Link
						className='btn btn-secondary'
						to={`/notes/$noteId`}
						params={{
							noteId: note.id,
						}}
						key={note.id}
					>
						{note.title}
					</Link>
				)
			})}
		</>
	)
}
