import { getHistory } from "../lib/history";
export default function History() {
    const history = getHistory();
    return (
        <div className="w-full max-w-md object-cover rounded-md mb-2">
          <h2 className="font-bold mb-2">History</h2>
          <ul className="space-y-4">
            {history.map((item) => (
              <li
                key={item.id}
                className=""
              >
                <div className="flex gap-4">
                    <img
                    src={item.imageUrl}
                    alt={item.prompt}
                    className="h-20 w-auto"
                    />
                    <div className="text-sm">
                    <p><span className="font-semibold">ID:</span> {item.id}</p>
                    <p><span className="font-semibold">Prompt:</span> {item.prompt}</p>
                    <p><span className="font-semibold">Style:</span> {item.style}</p>
                    <p>
                        <span className="font-semibold">Created At:</span>{" "}
                        {new Date(item.createdAt).toLocaleString()}
                    </p>
                    </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
}       