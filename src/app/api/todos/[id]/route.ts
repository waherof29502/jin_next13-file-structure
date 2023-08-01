import { NextResponse } from 'next/server';

const DATA_SOURCE_URL = 'https://jsonplaceholder.typicode.com/todos';
const API_KEY: string = process.env.DATA_API_KEY as string;
type Props = {
  params: {
    id: string;
  };
};
type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export async function GET(request: Request, { params: { id } }: Props) {
  //const id = request.url.slice(request.url.lastIndexOf('/') + 1);
  const res = await fetch(`${DATA_SOURCE_URL}/${id}`);
  const todo: Todo = await res.json();
  if (!todo.id) return NextResponse.json({ message: 'Todo not found' });
  return NextResponse.json(todo);
}
