export async function getTodayTriviaStatus(userId: string): Promise<boolean> {
  // Simulasi bahwa user belum menjawab trivia hari ini
  return false
}

export async function markTriviaShown(userId: string): Promise<void> {
  console.log(`Trivia marked as shown for user ${userId}`)
}