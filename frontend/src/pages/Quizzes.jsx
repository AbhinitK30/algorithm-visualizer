"use client"

import { useState } from "react"
import { useApi, useApiMutation } from "../hooks/useApi"
import useAuth from "../contexts/useAuth"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import LoadingSpinner from "../components/ui/LoadingSpinner"

const Quizzes = () => {
  const { data: quizzes, loading, error } = useApi("/api/quizzes")
  const { mutate } = useApiMutation()
  const { isAuthenticated } = useAuth()

  const [activeQuiz, setActiveQuiz] = useState(null)
  const [answers, setAnswers] = useState([])
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [submitError, setSubmitError] = useState("")

  const startQuiz = (quiz) => {
    setActiveQuiz(quiz)
    setAnswers(Array(quiz.questions.length).fill(null))
    setStep(0)
    setResult(null)
    setSubmitError("")
  }

  const handleSelect = (idx) => setAnswers((a) => a.map((v, i) => (i === step ? idx : v)))
  const next = () => setStep((s) => Math.min(s + 1, activeQuiz.questions.length - 1))
  const prev = () => setStep((s) => Math.max(s - 1, 0))

  const submit = async () => {
    if (!isAuthenticated) {
      setSubmitError("You must be logged in to submit a quiz.")
      return
    }

    setSubmitting(true)
    try {
      const response = await mutate("post", "/api/quizzes/submit", {
        topic: activeQuiz.topic,
        answers: answers.map((ansIdx, i) => (ansIdx !== null ? activeQuiz.questions[i].options[ansIdx] : null)),
      })
      setResult(response)
      setSubmitError("")
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (activeQuiz && !result) {
    const q = activeQuiz.questions[step]
    const progress = ((step + 1) / activeQuiz.questions.length) * 100

    return (
      <div className="flex-1 w-full h-full p-2 md:p-6 flex">
        <Card className="w-full max-w-3xl m-auto bg-white/90 shadow-2xl border-blue-100">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-blue-700">{activeQuiz.topic} Quiz</h1>
              <div className="text-sm text-gray-600 font-semibold">
                Question {step + 1} of {activeQuiz.questions.length}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">{q.questionText}</h2>

            <div className="grid gap-3">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full px-4 py-3 rounded-lg border text-left transition-all duration-200 font-medium ${
                    answers[step] === idx
                      ? "bg-blue-600 text-white border-blue-700 shadow-md transform scale-[1.02]"
                      : "bg-white border-blue-300 hover:bg-blue-50 hover:border-blue-400"
                  }`}
                  disabled={submitting}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center gap-4">
            <Button variant="secondary" onClick={prev} disabled={step === 0 || submitting}>
              ← Previous
            </Button>

            <div className="flex gap-2">
              {step < activeQuiz.questions.length - 1 ? (
                <Button onClick={next} disabled={answers[step] === null || submitting}>
                  Next →
                </Button>
              ) : (
                <Button
                  variant="success"
                  onClick={submit}
                  disabled={answers.some((a) => a === null) || submitting || !isAuthenticated}
                  loading={submitting}
                >
                  Submit Quiz
                </Button>
              )}
            </div>
          </div>

          {submitError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 font-semibold text-center">{submitError}</p>
            </div>
          )}

          {!isAuthenticated && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-700 font-semibold text-center">You must be logged in to submit a quiz.</p>
            </div>
          )}
        </Card>
      </div>
    )
  }

  if (result) {
    const percentage = Math.round((result.score / result.total) * 100)

    return (
      <div className="flex-1 w-full h-full p-2 md:p-6 flex">
        <Card className="w-full max-w-3xl m-auto bg-white/90 shadow-2xl border-blue-100 text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">{percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "📚"}</div>
            <h1 className="text-3xl font-bold text-blue-700 mb-2">Quiz Complete!</h1>
            <div className="text-2xl mb-2">
              Score:{" "}
              <span
                className={`font-bold ${percentage >= 80 ? "text-green-600" : percentage >= 60 ? "text-yellow-600" : "text-red-600"}`}
              >
                {result.score} / {result.total}
              </span>
            </div>
            <div className="text-lg text-gray-600">{percentage}% Correct</div>
          </div>

          <div className="mb-6 text-left">
            <h3 className="font-semibold mb-4 text-center text-lg">Review Answers:</h3>
            <div className="space-y-4">
              {activeQuiz.questions.map((q, i) => {
                const userAnswer = answers[i] !== null ? q.options[answers[i]] : "No answer"
                const isCorrect = result.correctAnswers[i] === userAnswer

                return (
                  <div
                    key={i}
                    className={`p-4 rounded-lg border ${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
                  >
                    <div className="font-semibold mb-2">
                      Q{i + 1}: {q.questionText}
                    </div>
                    <div className="text-sm">
                      <div className={`mb-1 ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                        Your answer: {userAnswer} {isCorrect ? "✓" : "✗"}
                      </div>
                      {!isCorrect && <div className="text-green-700">Correct answer: {result.correctAnswers[i]}</div>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <Button
            onClick={() => {
              setActiveQuiz(null)
              setResult(null)
            }}
            size="lg"
          >
            Back to Quizzes
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 w-full h-full p-2 md:p-6 flex">
      <Card className="w-full max-w-4xl m-auto bg-white/90 shadow-2xl border-blue-100">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">📝 Algorithm Quizzes</h1>

        {loading && (
          <div className="text-center py-8">
            <LoadingSpinner size="lg" />
            <p className="mt-2 text-blue-500">Loading quizzes...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 py-8">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && quizzes && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card
                key={quiz._id}
                gradient
                className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => startQuiz(quiz)}
              >
                <div className="text-4xl mb-3">🧠</div>
                <div className="text-xl font-bold text-blue-700 mb-2">{quiz.topic}</div>
                <div className="text-gray-600 mb-4">{quiz.questions.length} questions</div>
                <Button className="w-full">Start Quiz</Button>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

export default Quizzes
