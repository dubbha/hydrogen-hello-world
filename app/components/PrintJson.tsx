// Used to debug the JSON in JSX:
// <PrintJson data={product} title="Product JSON" />

export default function PrintJson({
  data,
  title = 'JSON',
}: {
  data: any;
  title?: string;
}) {
  return (
    <details className="outline outline-2 outline-blue-300 p-4 my-2">
      <summary>{title}</summary>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </details>
  );
}
