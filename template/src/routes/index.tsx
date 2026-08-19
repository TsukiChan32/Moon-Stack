import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-3xl font-bold text-indigo-600">
        Moon-Stack
      </h1>
    </div>
  )
}
