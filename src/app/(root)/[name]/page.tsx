interface pageProps {
  params: { name: string };
  searchParams: any;
}

export default function page({ params, searchParams }: pageProps) {
  console.log('searchParams', searchParams);
  return <div> other name: {params.name}</div>;
}
