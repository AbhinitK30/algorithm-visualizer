import { useApi } from "../hooks/useApi"
import Card from "../components/ui/Card"
import LoadingSpinner from "../components/ui/LoadingSpinner"

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

const Leaderboard = () => {
  const { data, loading, error } = useApi("/api/leaderboard")

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white/90 shadow-2xl border-blue-100">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">🏆 Leaderboard</h1>

        {loading && (
          <div className="text-center py-8">
            <LoadingSpinner size="lg" />
            <p className="mt-2 text-blue-500">Loading leaderboard...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 py-8">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && data && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-blue-800 text-lg">
                  <th className="px-4 py-3">Rank</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Total Score</th>
                  <th className="px-4 py-3">Attempts</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user, idx) => (
                  <tr
                    key={user.email}
                    className={`rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                      idx < 3
                        ? "bg-gradient-to-r from-yellow-100 via-white to-yellow-50 shadow-md"
                        : "bg-white shadow-sm hover:shadow-md"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        {idx === 0 && <span className="text-2xl mr-2">🥇</span>}
                        {idx === 1 && <span className="text-2xl mr-2">🥈</span>}
                        {idx === 2 && <span className="text-2xl mr-2">🥉</span>}
                        <span className="font-bold text-xl text-blue-600">#{idx + 1}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg shadow-md ${
                            idx === 0
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                              : idx === 1
                                ? "bg-gradient-to-r from-gray-300 to-gray-500 text-gray-800"
                                : idx === 2
                                  ? "bg-gradient-to-r from-yellow-600 to-yellow-800 text-white"
                                  : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700"
                          }`}
                        >
                          {getInitials(user.name)}
                        </span>
                        <span className="font-semibold text-gray-800">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-lg font-mono font-bold text-green-600">{user.totalScore}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-lg text-gray-600">{user.attempts}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}

export default Leaderboard
