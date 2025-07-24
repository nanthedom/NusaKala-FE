export function Leaderboard({ data }: { data: { username: string; streak: number }[] }) {
  return (
    <div className="p-4 rounded-xl border border-nusa-gold/30 bg-white">
      <h2 className="text-lg font-bold text-nusa-dark-brown mb-4">🔥 Trivia Streak Leaderboard</h2>
      <ul className="space-y-2">
        {data.map((user, index) => (
          <li key={user.username} className="flex justify-between items-center">
            <span className="text-nusa-brown">{index + 1}. {user.username}</span>
            <span className="text-nusa-gold font-semibold">{user.streak} 🔥</span>
          </li>
        ))}
      </ul>
    </div>
  )
}